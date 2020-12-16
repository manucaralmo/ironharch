class IronHarch {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = CANVAS_WIDTH
        this.canvas.height = CANVAS_HEIGHT
        this.ctx = this.canvas.getContext('2d')

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
                // Draw elements
                this.clear()
                this.draw()
                this.move()
            }, this.fps)
        }
    }

    draw() {
        this.player.draw()

        // Draw Enemies
        this.enemies.forEach(enemy => {
            enemy.playerX = this.player.x
            enemy.playerY = this.player.y
            enemy.draw()
        })

        this.checkTheNearest()
    }

    move() {
        this.player.move()

        // Move Enemies
        this.enemies.forEach(enemy => {
            enemy.move()
        })
    }

    clear() {
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

    // Eliminar enemigos cuando su puntuacion sea <= 0
    clearEnemies() {

    }

    onKeyEvent(event) {
        this.player.onKeyEvent(event)
    }
}