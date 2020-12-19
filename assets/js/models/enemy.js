class Enemy {
    constructor(ctx, x, y, isMoving = false, shootingInterval = 115, shotPower = 500, collisionPower = 1, health = 100){
        this.ctx = ctx

        this.x = x
        this.y = y
        this.isMoving = isMoving
        this.vy = 0
        this.vx = 0

        this.width = 35
        this.height = 35

        // Health & power
        this.maxHealth = health
        this.health = health
        this.collisionPower = collisionPower // Poder de colision
        this.shotPower = shotPower // Poder de colision

        // Bullets
        this.bullets = []
        this.shooting = false
        this.shootingCount = 0
        this.shootingInterval = shootingInterval

        // Current player position - game:39:40
        this.playerX = 300
        this.playerY = 550

        this.dx = 0
        this.dy = 0
        this.ange = undefined
    }

    draw() {
        // *** Código provisional ***
        this.ctx.save()
            this.ctx.fillStyle = 'orange'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.restore()
        this.ctx.save()
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.x, this.y + this.height + 4, this.healthPercent(), 3)
        this.ctx.restore()
        // *** Código provisional ***
        
        this.bullets.forEach(bullet => {
            bullet.draw()
        })
        this.shot()
    }

    move() {
        // Move Enemy
        if(this.isMoving){
            this.getPlayerAngle()
            this.x += this.vx
            this.y += this.vy
        }

        // Check
        if (this.x <= 0){
            this.x = 0
        } else if (this.x + this.width >= CANVAS_WIDTH){
            this.x = CANVAS_WIDTH - this.width
        }

        if (this.y <= 0){
            this.y = 0
        } else if (this.y + this.height >= CANVAS_HEIGHT){
            this.y = CANVAS_HEIGHT - this.height
        }

        this.bullets.forEach(bullet => {
            bullet.move()
        })
    }

    healthPercent(){
        let percent = (this.health * 100)/this.maxHealth
        return percent * this.width / 100
    }

    shot() {
        if(this.shootingCount >= this.shootingInterval){
            // Calcular angulo para el disparo
            this.getPlayerAngle()

            // Crear nuevo bullet
            this.bullets.push(new EnemyBullet(this.ctx, this.x+(this.width/2), this.y+(this.height/2), this.vx*4, this.vy*4, this.shotPower))
            this.shootingCount = 0
        }
        this.shootingCount++
        // Clean bullets
        this.clearBullets()
    }

    getPlayerAngle() {
        // Calcular angulo para el disparo
        this.dx = this.playerX - this.x
        this.dy = this.playerY - this.y
        this.angle = Math.atan2(this.dx, this.dy)

        this.vx = Math.sin(this.angle)
        this.vy = Math.cos(this.angle)
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => {
            return bullet.x + bullet.width >= 0 && bullet.x <= CANVAS_WIDTH && bullet.y + bullet.height >= 0 && bullet.y <= CANVAS_HEIGHT
        })
    }

    collidesWith(element) {
        return  this.x < element.x + element.width &&
                this.x + this.width > element.x &&
                this.y < element.y + element.height &&
                this.y + this.height > element.y
    }
}