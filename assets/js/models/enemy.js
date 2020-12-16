class Enemy {
    constructor(ctx, x, y){
        this.ctx = ctx

        this.x = x
        this.y = y
        //this.vy = vy
        //this.vx = vx

        this.width = 35
        this.height = 35

        // Health & power
        this.health = 100
        this.power = 50

        // Bullets
        this.bullets = []
        this.shooting = false
        this.shootingCount = 0
        this.shootingInterval = 85

        // Current player position - game:39:40
        this.playerX = 300
        this.playerY = 550
    }

    draw() {
        // *** Código provisional ***
        this.ctx.save()
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.restore()
        // *** Código provisional ***
        
        this.bullets.forEach(bullet => {
            bullet.draw()
        })
        this.shot()
    }

    move() {
        // Move Enemy
        //this.x += this.vx
        //this.y += this.vy

        this.bullets.forEach(bullet => {
            bullet.move()
        })
    }

    shot() {
        if(this.shootingCount >= this.shootingInterval){
            // Calcular angulo para el disparo
            let dx = this.playerX - this.x
            let dy = this.playerY - this.y
            let angle = Math.atan2(dx, dy)

            // Crear nuevo bullet
            this.bullets.push(new EnemyBullet(this.ctx, this.x+(this.width/2), this.y, Math.sin(angle)*4, Math.cos(angle)*4))
            this.shootingCount = 0
        }
        this.shootingCount++
        // Clean bullets
        this.clearBullets()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => {
            return bullet.x + bullet.width >= 0 && bullet.x <= CANVAS_WIDTH && bullet.y + bullet.height >= 0 && bullet.y <= CANVAS_HEIGHT
        })
    }
}