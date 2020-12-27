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
        this.enemiesCount = 0

        this.topBar = new TopBar(this.ctx)
        this.coinsArr = []
        this.coinsWin = 0

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
        this.level = 1 // 1
        this.changingLevel = false
        this.record = localStorage.getItem("IronHarchRecord");
        this.selectAdvantageCount = 0
        this.gift = undefined

        // Debug
        this.startTime = undefined
        this.endTime = undefined
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
        // Stop home music
        this.homeMusic(false)
        // Load audio
        this.sounds.collisionBalaEnemy.load()
        this.sounds.selector.load()

        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                // Performance Start
                this.startTime = performance.now()
                
                // ======= PRIMARY FUNCTIONS ======
                this.checkTheNearest() // Comprobar enemigo más cercano
                this.clear() // Limpiar canvas
                this.draw() // Dibujar elementos en el canvas
                this.checkHealth() // Comprobar vidas
                this.checkCollisions() // Comprobar colisiones
                this.filterBullets() // Eliminar balas una vez colisonan
                this.move() // Mover elementos del canvas
                this.clearEnemies() // Eliminar enemigos si su health < 0
                // ======= PRIMARY FUNCTIONS ======

                // NEXT LEVEL
                if(this.enemies.length <= 0 && !this.changingLevel){
                    this.nextLevel()
                }
                // Performance End
                this.endTime = performance.now()
            }, this.fps)
        }
    }

    createLevel() {
        // Limpiamos los obstáculos anteriores
        this.obstacles = []

        // Creamos los enemigos
        LEVELS[this.level].enemies.forEach(newEnemy => {
            this.enemies.push(new Enemy(this.ctx, newEnemy[0], newEnemy[1], newEnemy[2], newEnemy[3], newEnemy[4], newEnemy[5], newEnemy[6], newEnemy[7], newEnemy[8], newEnemy[9]))
        })

        // Creamos los obstáculos
        LEVELS[this.level].obstacles.forEach(obs => {
            this.obstacles.push(new Obstacle(this.ctx, obs[0], obs[1], obs[2]))
        })

        this.changingLevel = false
    }

    selectAdvantage() {
        let selectAdvantageDisplay = document.getElementById('selectAdvantage')
        let advantageBtns = document.querySelectorAll('.advantageSelect')

        // RANDOM ADVANTAGES
        let randomNoRepeats = (array) => {
            let copy = array.slice(0);
            return () => {
                if (copy.length < 1) { copy = array.slice(0); }
                let index = Math.floor(Math.random() * copy.length);
                let item = copy[index];
                copy.splice(index, 1);
                return item;
            };
        }
        // Array con extras disponibles a elegir aleatoriamente. (Coincide nombre de la ventaja y nombre del archivo)
        let btnArray = ["doubleArrow", "fullHealth", "doubleHealth", "doubleSpeed", "doubleAttack", "doubleShotSpeed", "extraLife"];
        let chooser = randomNoRepeats(btnArray);

        // Rellenamos la info de las ventajas en los 3 botones de index.html
        advantageBtns.forEach((btn, index) => {
            let newAD = chooser()
            btn.dataset.power = newAD
            document.querySelector(`#advantaje${index}`).src = `assets/images/extras/${newAD}.png`
        })
        // RANDOM ADVANTAGES

        setTimeout(() => {
            this.sounds.selector.play()
            selectAdvantageDisplay.style.display = 'block'
        }, 500)

        advantageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                switch(btn.dataset.power){
                    case 'doubleArrow':
                        this.player.extras.doubleShot = true
                        break;
                    case 'fullHealth':
                        this.player.health = this.player.maxHealth
                        break;
                    case 'doubleHealth':
                        this.player.maxHealth += 500
                        this.player.health = this.player.maxHealth
                        break;
                    case 'doubleSpeed':
                        this.player.speed = PLAYER_SPEED * 1.5
                        break;
                    case 'doubleAttack':
                        this.player.shotPower *= 2
                        break;
                    case 'doubleShotSpeed':
                        this.player.shotSpeed += 0.5
                        break;
                    case 'extraLife':
                        this.player.extras.extraLifeCount += 1
                        break;
                }

                selectAdvantageDisplay.style.display = 'none'
                setTimeout(() => this.createLevel(), 2000)
            })
        })

    }

    nextLevel() {
        if(this.level === Object.keys(LEVELS).length){
            this.win()
        } else {
            this.changingLevel = true
            this.level++

            if(this.selectAdvantageCount === 2){ // 2
                this.selectAdvantageCount = 0
                this.gift = new Gift(this.ctx)
            } else {
                this.selectAdvantageCount++
                setTimeout(() => this.createLevel(), 2000)
            }
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
        // Check record
        if(this.checkRecord()){
            console.log('win & new record')
        } else {
            // Game over screen
            this.ctx.save()
            this.ctx.font = '35px Arial'
            this.ctx.fillStyle = 'white'
            this.ctx.textAlign = 'center'
            this.ctx.fillText('You win!', this.ctx.canvas.width / 2, (this.ctx.canvas.height / 2) - 25)
            this.ctx.font = '25px Arial'
            this.ctx.fillText(`Your level: ${this.level}`, (this.ctx.canvas.width / 2), (this.ctx.canvas.height / 2) + 15)
            this.ctx.fillText(`Record: ${this.record}`, (this.ctx.canvas.width / 2), (this.ctx.canvas.height / 2) + 45)
            this.ctx.restore()
        }
    }

    checkRecord() {
        if (this.level > this.record){
            localStorage.setItem("IronHarchRecord", this.level);
            this.record = this.level
            return true
        }
    }

    lose() {
        // Stop game
        this.stop()
        // Check record
        if(this.checkRecord()){
            console.log('lose & new record')
        } else {
            // Game over screen
            this.ctx.save()
            this.ctx.font = '35px Arial'
            this.ctx.fillStyle = 'white'
            this.ctx.textAlign = 'center'
            this.ctx.fillText('Game over!', this.ctx.canvas.width / 2, (this.ctx.canvas.height / 2) - 25)
            this.ctx.font = '25px Arial'
            this.ctx.fillText(`Your level: ${this.level}`, (this.ctx.canvas.width / 2), (this.ctx.canvas.height / 2) + 15)
            this.ctx.fillText(`Record: ${this.record}`, (this.ctx.canvas.width / 2), (this.ctx.canvas.height / 2) + 45)
            this.ctx.restore()
        }
    }

    draw() {
        // Draw Background
        this.background.draw()

        // Draw Obstacles
        if(this.obstacles.length > 0){
            this.obstacles.forEach(obstacle => obstacle.draw())
        }

        // Draw Player
        this.player.draw()

        // Draw Enemies
        if(this.enemies.length > 0){
            this.enemies.forEach(enemy => {
                enemy.playerX = this.player.x
                enemy.playerY = this.player.y
                enemy.draw()
            })
        }

        // Draw coins
        if(this.coinsArr.length > 0){
            this.coinsArr.forEach(coin => {
                coin.draw()
            })
        }

        // Draw Gift --- advantage character
        if(this.gift !== undefined){
            this.gift.draw()
        }

        // Draw Top Bar
        this.topBar.draw(this.player.health, this.coinsWin)
    }

    move() {
        // Move player
        this.player.move()
        // Move Enemies
        if(this.enemies.length > 0){
            this.enemies.forEach(enemy => {
                enemy.move()
            })
        }
    }

    clear() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    checkTheNearest() {
        // Si existen varios enemigos, escogemos el más cercano
        if (this.enemies.length <= 0){
            this.player.nearestEnemy = undefined
        } else if (this.enemies.length === 1) {
            // Si sólo existe un enemigo, mandamos ese enemigo
            this.player.nearestEnemy = this.enemies[0]
        } else {
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
    }

    checkCollisions() {
        // Comprobar colisiones con enemigos y player
        if(this.enemies.length > 0){
            this.enemies.forEach(enemy => {
                // Comprobar colisiones de Player con Enemy (Cuerpo a cuerpo)
                if(enemy.collidesWith(this.player)){
                    if(this.player.health > 0){
                        this.player.health -= enemy.collisionPower
                    }
                    enemy.health -= this.player.collisionPower
                }
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
        }

        // Comprobar colisiones con obstaculos en el canvas
        if(this.obstacles.length > 0){
            this.obstacles.forEach(obstacle => {
                // COLISIONES DE OBSTACULOS Y PLAYER
                this.player.collidesWithObstacle(obstacle)
                // COLISIONES DE OBSTACULOS Y ENEMY
                this.enemies.forEach(enem => {
                    enem.collidesWithObstacle(obstacle)
                })
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

        // Comprobar colisiones con monedas
        if(this.coinsArr.length > 0){
            this.coinsArr.forEach(coin => {
                if(coin.collidesWith(this.player) && coin.collides === false){
                    coin.collides = true
                    this.coinsWin++
                    this.clearCoins()
                }
            })
        }

        // colision con gift
        if(this.gift !== undefined){
            if(this.gift.collidesWith(this.player)){
                this.selectAdvantage()
                this.gift = undefined
            }
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
            if(this.player.extras.extraLifeCount > 0){
                this.player.health = this.player.maxHealth
            } else {
                this.lose()
            }
        }
    }

    filterBullets() {
        // Eliminar bala (Player) una vez ha colisionado
        if(this.player.bullets.length > 0){
            this.player.bullets = this.player.bullets.filter(playerBullet => !playerBullet.collides)
        }
        
        // Eliminar bala (Enemy) una vez ha colisionado
        if(this.enemies.length > 0){
            this.enemies.forEach(enemy => {
                if(enemy.bullets.length > 0){
                    enemy.bullets = enemy.bullets.filter(enemyBullet => !enemyBullet.collides)
                }
            })
        }
    }

    clearEnemies() {
        this.enemiesCount = this.enemies.length
        if(this.enemies.length > 0){
            // Eliminar enemigos cuando su puntuacion sea <= 0
            this.enemies = this.enemies.filter(enemy => enemy.health > 0)
        }
        // Si eliminamos algun enemigo, creamos una moneda
        if(this.enemies.length < this.enemiesCount){
            this.coinsArr.push(new Coin(this.ctx, Math.random() * (350 - 38) + 38, Math.random() * (660 - 165) + 165))
        }
    }

    clearCoins() {
        // Eliminar monedas cuando collides sea true
        this.coinsArr = this.coinsArr.filter(coin => coin.collides === false)
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

    debug() {
        setInterval(() => {
            console.clear()
            // Player
            console.log('Player bullets: ' + this.player.bullets.length)
            console.log(`Player position: x:${this.player.x}, y:${this.player.y}`)
            console.log(`===========================`)
            
            // Enemies
            console.log('Enemies: ' + this.enemies.length)
            this.enemies.forEach((enem, idx) => {
                console.log(`Enemy ${idx} bullets: ${enem.bullets.length}`)
            })
            console.log(`===========================`)

            // Obstacles
            console.log('Obstacles: ' + this.obstacles.length)
            console.log(`===========================`)

            // Time execution start()
            let execTime = this.endTime - this.startTime
            console.log('Exec Time: ' + execTime)

        }, 1000);
    }
}