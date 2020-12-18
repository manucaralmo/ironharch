class Player {
    constructor(ctx){
        this.ctx = ctx

        // Player position
        this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2
        this.y = PLAYER_Y

        // Player dimensions
        this.width = PLAYER_WIDTH
        this.height = PLAYER_HEIGHT

        // Player speed
        this.speed = PLAYER_SPEED
        this.vx = 0
        this.vy = 0

        // Player movements
        this.movements = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        // Bullets
        this.bullets = []
        this.shooting = false
        this.shootingCount = 0
        this.shootingInterval = 25

        // Health
        this.health = 1000

        // Nearest Enemy
        this.nearestEnemy = undefined
    }

    draw() {
        // *** Código provisional ***
        this.ctx.save()
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.restore()
        // *** Código provisional ***

        // Draw Bullets
        this.bullets.forEach(bullet => {
            bullet.draw()
        })
        if(this.shooting){
            this.shot()
        }
    }

    move() {
        // Set up & down speed
        if (this.movements.up){
            this.vy = -this.speed
        } else if (this.movements.down){
            this.vy = this.speed
        } else {
            this.vy = 0;
        }

        // Set left & right speed
        if (this.movements.left){
            this.vx = -this.speed
        } else if (this.movements.right){
            this.vx = this.speed
        } else {
            this.vx = 0;
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

        // Move player
        this.x += this.vx
        this.y += this.vy
        
        this.bullets.forEach(bullet => {
            bullet.move()
        })
    }

    shot() {
        if(this.shootingCount >= this.shootingInterval && this.nearestEnemy){
            // Calcular angulo para el disparo
            let dx = this.nearestEnemy.x - this.x - 15
            let dy = this.nearestEnemy.y - this.y + 15
            let angle = Math.atan2(dx, dy)

            // Crear nuevo bullet
            this.bullets.push(new Bullet(this.ctx, this.x+(this.width/2), this.y, Math.sin(angle)*4, Math.cos(angle)*4))
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

    onKeyEvent(event) {
        // If keydown --> status = True / else status = false
        const status = event.type === 'keydown'

        // seteamos el status de shooting
        this.shooting = !status

        switch(event.keyCode) {
        case ARROW_UP:
            this.movements.up = status
            break
        case ARROW_RIGHT:
            this.movements.right = status
            break
        case ARROW_BOTTOM:
            this.movements.down = status
            break
        case ARROW_LEFT:
            this.movements.left = status
            break
        }
    }

}