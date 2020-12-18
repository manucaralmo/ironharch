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
        this.enemies = [ 
            new Enemy(this.ctx, 80, 350), 
            new Enemy(this.ctx, 270, 350),
            new Enemy(this.ctx, 80, 150),
            new Enemy(this.ctx, 270, 150)
        ]
    }

    start() {
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                this.checkTheNearest() // Comprobar enemigo más cercano
                this.clear() // Limpiar canvas
                this.draw() // Dibujar elementos en el canvas
                this.checkCollisions() // Comprobar colisiones
                this.move() // Mover elementos del canvas
                this.clearEnemies() // Eliminar enemigos si su health < 0
            }, this.fps)
        }
    }

    stop() {
        clearInterval(this.intervalId)
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
        this.enemies.forEach(enemy =>{
            if(this.player.bullets.some(bullet => enemy.collidesWith(bullet))) {
                console.log('colision')
                enemy.health -= 5 // Prueba
            }
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