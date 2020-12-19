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

        // Player
        this.player = new Player(this.ctx)

        // Enemies
        this.enemies = []
        this.level = 1
        this.changingLevel = false

        this.topBar = new TopBar(this.ctx)
    }

    start() {
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
        LEVELS[this.level].enemies.forEach(newEnemy => {
            this.enemies.push(new Enemy(this.ctx, newEnemy[0], newEnemy[1], newEnemy[2], newEnemy[3], newEnemy[4]))
        })
        this.changingLevel = false
    }

    nextLevel() {
        if(this.level === Object.keys(LEVELS).length){
            this.win()
        } else {
            this.changingLevel = true
            this.level += 1
            setTimeout(() => this.createLevel(), 2000)
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
        clearInterval(this.intervalId)
        console.log('Has ganado')
    }

    draw() {
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
                    enemy.health -= playerBullet.power
                    playerBullet.collides = true
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

    checkHealth() {
        if(this.player.health <= 0){
            this.stop()
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
        this.player.onKeyEvent(event)
    }
}