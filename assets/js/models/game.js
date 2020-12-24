class IronHarch {
    constructor(canvasId) {
        // Canvas info
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = CANVAS_WIDTH
        this.canvas.height = CANVAS_HEIGHT
        this.ctx = this.canvas.getContext('2d')

        // Interval info
        this.fps = 1000/60
        this.intervalId = undefined

        // Background && Obstacles
        this.background = undefined
        this.obstacles = []

        // Player
        this.player = new Player(this.ctx)

        // Enemies
        this.enemies = []

        this.topBar = new TopBar(this.ctx)

        // Music
        this.sounds = {
            home: new Audio('assets/sounds/home.mp3'),
            collisionBalaEnemy: new Audio('assets/sounds/impacto-bala-enemigo.mp3'),
            selector: new Audio('assets/sounds/selector.mp3')
        }

        // MOBILE JOYSTIC
        this.touchStartX = undefined
        this.touchStartY = undefined

        // LEVEL & RECORD
        this.level = 1
        this.changingLevel = false
        this.record = localStorage.getItem("IronHarchRecord");
    }

    homeMusic(play) {
        if(play){
            this.sounds.home.loop = true;
            this.sounds.home.play()
        } else {
            this.sounds.home.pause()
        }
    }

    createBackground(bg) {
        this.background = new Background(this.ctx, bg)
    }

    start() {
        this.homeMusic(false)

        if(!this.intervalId){
            this.intervalId = setInterval(() => {

                this.checkTheNearest() // Comprobar enemigo más cercano
                this.clear() // Limpiar canvas
                this.draw() // Dibujar elementos en el canvas
                this.checkHealth() // Comprobar vidas
                this.checkCollisions() // Comprobar colisiones
                this.filterBullets() // Eliminar balas una vez colisonan
                this.move() // Mover elementos del canvas
                this.clearEnemies() // Eliminar enemigos si su health < 0

                // Pasamos al siguiente nivel
                if(this.enemies.length <= 0 && !this.changingLevel){
                    this.nextLevel()
                }

            }, this.fps)
        }
    }

    createLevel() {
        // Limpiamos los obstáculos anteriores
        this.obstacles = []

        // Creamos los enemigos
        LEVELS[this.level].enemies.forEach(newEnemy => {
            this.enemies.push(new Enemy(this.ctx, newEnemy[0], newEnemy[1], newEnemy[2], newEnemy[3], newEnemy[4], newEnemy[5], newEnemy[6], newEnemy[7], newEnemy[8]))
        })

        // Creamos los obstáculos
        LEVELS[this.level].obstacles.forEach(obs => {
            this.obstacles.push(new Obstacle(this.ctx, obs[0], obs[1], obs[2]))
        })

        this.changingLevel = false
    }

    selectAdvantage() {

        let selectAdvantageDisplay = document.getElementById('selectAdvantage')
        setTimeout(() => {
            this.sounds.selector.play()
            selectAdvantageDisplay.style.display = 'block'
        }, 1500)

        let doubleArrowBtn = document.getElementById('doubleArrow')
        let doubleArrowSpeedBtn = document.getElementById('doubleArrowSpeed')

        doubleArrowBtn.addEventListener('click', () => {
            this.player.extras.doubleShot = true
            selectAdvantageDisplay.style.display = 'none'
            setTimeout(() => this.createLevel(), 2000)
        })

        doubleArrowSpeedBtn.addEventListener('click', () => {
            this.player.extras.doubleSpeed = true
            selectAdvantageDisplay.style.display = 'none'
            setTimeout(() => this.createLevel(), 2000)
        })
    }

    nextLevel() {
        if(this.level === Object.keys(LEVELS).length){
            this.win()
        } else {
            this.changingLevel = true
            this.level++
            this.selectAdvantage()
        }
    }

    stop() {
        clearInterval(this.intervalId)
        this.ctx.save()
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.restore()
    }

    win() {
        this.enemies = []
        this.stop()
        console.log('Has ganado')
    }

    checkRecord() {
        if (this.level > this.record){
            localStorage.setItem("IronHarchRecord", this.level);
            this.record = this.level
        }
    }

    lose() {
        // Stop game
        this.stop()
        // Set record
        this.checkRecord()

        // Game over screen
        this.ctx.save()
        this.ctx.font = '35px Arial Bold'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
            'Game over!',
            this.ctx.canvas.width / 2,
            (this.ctx.canvas.height / 2) - 25,
        )
        this.ctx.font = '25px Arial'
        this.ctx.fillText(
            `Your level: ${this.level}`,
            (this.ctx.canvas.width / 2),
            (this.ctx.canvas.height / 2) + 15,
        )
        this.ctx.fillText(
            `Record: ${this.record}`,
            (this.ctx.canvas.width / 2),
            (this.ctx.canvas.height / 2) + 45,
        )
        this.ctx.restore()
    }

    draw() {
        // Draw Background
        this.background.draw()
        this.obstacles.forEach(obstacle => obstacle.draw())
        // Draw Player
        this.player.draw()
        // Draw Enemies
        this.enemies.forEach(enemy => {
            enemy.playerX = this.player.x
            enemy.playerY = this.player.y
            enemy.draw()
        })

        this.topBar.draw(this.player.health)
    }

    move() {
        // Move player
        this.player.move()
        // Move Enemies
        this.enemies.forEach(enemy => {
            enemy.move()
        })
    }

    clear() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    checkTheNearest() {
        let a, b, c, NewEnemyObject
        let enemiesWithDistance = this.enemies.map(enemy => {
            a = enemy.x - this.player.x;
            b = enemy.y - this.player.y;
            c = Math.sqrt( a*a + b*b );
            NewEnemyObject = {
                distance: c,
                x: enemy.x,
                y: enemy.y
            }
            return NewEnemyObject
        }).sort((a, b) => {
            return a.distance - b.distance
        })
        // Set nearest enemy 
        this.player.nearestEnemy = enemiesWithDistance[0]
    }

    checkCollisions() {
        // Comprobar colisiones de Player con Enemy (Cuerpo a cuerpo)
        this.enemies.forEach(enemy => {
            if(enemy.collidesWith(this.player)){
                if(this.player.health > 0){
                    this.player.health -= enemy.collisionPower
                }
                enemy.health -= this.player.collisionPower
            }
        })

        // Comprobar colisiones de Bullets
        this.enemies.forEach(enemy => {
            // Comprobar colisiones de balas (Player) con enemigos
            this.player.bullets.forEach(playerBullet => {
                if(enemy.collidesWith(playerBullet)){
                    // Health
                    enemy.health -= playerBullet.power
                    playerBullet.collides = true
                    // Play audio
                    this.playAudio('enemyCollision')

                }
            })
            // Comprobar colisiones de balas (Enemigo) con player
            enemy.bullets.forEach(enemyBullet => {
                if(this.player.collidesWith(enemyBullet)){
                    if(this.player.health > 0){
                        this.player.health -= enemyBullet.power
                    }
                    enemyBullet.collides = true
                }
            })
        })

        // Comprobar colisiones con obstaculos en el canvas
        if(this.obstacles.length > 0){
            this.obstacles.forEach(obstacle => {
                if(this.player.collidesWithObstacle(obstacle) === 'up'){
                    this.player.y = obstacle.y - this.player.height
                } else if(this.player.collidesWithObstacle(obstacle) === 'down'){
                    this.player.y = obstacle.y + obstacle.height
                } else if(this.player.collidesWithObstacle(obstacle) === 'left'){
                    this.player.x = obstacle.x - this.player.width
                } else if(this.player.collidesWithObstacle(obstacle) === 'right'){
                    this.player.x = obstacle.x + obstacle.width
                }
            })
        }

        // TODO: FALTA COLISIONES DE OBSTACULOS Y ENEMY

        // Comprobar colisiones de balas con obstaculos
        if(this.obstacles.length > 0){
            this.obstacles.forEach(obstacle => {

                // Comprobar colisiones de balas (Player) con obstaculos
                this.player.bullets.forEach(playerBullet => {
                    if(obstacle.collidesWith(playerBullet)){
                        playerBullet.collides = true
                    }
                })
                // Comprobar colisiones de balas (Enemy) con obstaculos
                this.enemies.forEach(enemy => {
                    enemy.bullets.forEach(enemyBullet => {
                        if(obstacle.collidesWith(enemyBullet)){
                            enemyBullet.collides = true
                        }
                    })
                })
            })
        }
    }

    playAudio(type) {
        if(type === 'enemyCollision'){
            this.sounds.collisionBalaEnemy.volume = 0.05
            this.sounds.collisionBalaEnemy.currentTime = 0
            this.sounds.collisionBalaEnemy.play()
        }
    }

    checkHealth() {
        if(this.player.health <= 0){
            this.lose()
        }
    }

    filterBullets() {
        // Eliminar bala (Player) una vez ha colisionado
        this.player.bullets = this.player.bullets.filter(playerBullet => !playerBullet.collides)
        
        // Eliminar bala (Enemy) una vez ha colisionado
        this.enemies.forEach(enemy => {
            enemy.bullets = enemy.bullets.filter(enemyBullet => !enemyBullet.collides)
        })
    }

    clearEnemies() {
        // Eliminar enemigos cuando su puntuacion sea <= 0
        this.enemies = this.enemies.filter(enemy => enemy.health > 0)
    }

    onKeyEvent(event) {
        event.preventDefault()
        this.player.onKeyEvent(event)
    }

    // Mobile events
    onTouchEvent(event) {
        event.preventDefault()
        if(event.type === 'touchend'){
            console.log('levanta el dedo')
            this.player.onTouchEvent('stop')
        }

        if(event.type === 'touchstart'){
            this.touchStartX = event.targetTouches[0].pageX
            this.touchStartY = event.targetTouches[0].pageY
        }
        
        if(event.type === 'touchmove'){
            if(this.touchStartX < event.targetTouches[0].pageX){
                console.log('vamo a la derecha')
                this.player.onTouchEvent('right')
            } else if (this.touchStartX > event.targetTouches[0].pageX){
                console.log('vamo a la izquierda')
                this.player.onTouchEvent('left')
            }

            if(this.touchStartY < event.targetTouches[0].pageY){
                console.log('vamo abajo')
                this.player.onTouchEvent('bottom')
            } else if (this.touchStartY > event.targetTouches[0].pageY){
                console.log('vamo arriba')
                this.player.onTouchEvent('top')
            }
        }
    }
}