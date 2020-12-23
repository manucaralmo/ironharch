class Enemy {
    constructor(ctx, x, y, isMoving = false, shootingInterval = 115, shotPower = 500, collisionPower = 1, health, weapon, bulletSize){
        this.ctx = ctx

        this.x = x
        this.y = y
        this.isMoving = isMoving
        this.vy = 0
        this.vx = 0

        this.width = 45
        this.height = 60

        // Health & power
        this.maxHealth = health
        this.health = health
        this.collisionPower = collisionPower // Poder de colision
        this.shotPower = shotPower // Poder de colision

        // Bullets
        this.weapon = weapon
        this.bulletSize = bulletSize
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

        // Image
        this.sprite = new Image()
        this.sprite.src = `assets/images/enemies/enemy1Sprite.png`
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 4
        this.sprite.verticalFrames = 1
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor((this.sprite.width) / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor((this.sprite.height) / this.sprite.verticalFrames)
        }

        // Image Shadow
        this.img2 = new Image()
        this.img2.src = './assets/images/enemies/shadow.png'
        this.img2.isReady = false
        this.img2.onload = () => {
            this.img2.isReady = true
        }

        // Sounds
        this.sounds = {
            enemyShot: new Audio('assets/sounds/disparo-enemigo.mp3')
        }
    }

    isReady() {
        return this.sprite.isReady && this.img2.isReady
    }

    draw() {
        // *** Código provisional ***
        if (this.isReady()) {
            this.ctx.drawImage(
                this.img2,
                this.x-(this.width/4),
                this.y+this.width,
                this.width+(this.width/2),
                this.height/2
            )

            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            )

            if(this.isMoving){
                this.sprite.drawCount++
                this.animate()
            }

        }

        // *** HEALTH ***
        this.ctx.save()
            this.ctx.fillStyle = '#921010'
            this.ctx.fillRect(this.x, this.y+this.height+5, this.width, 4)
        this.ctx.restore()
        this.ctx.save()
            this.ctx.fillStyle = '#DD1515'
            this.ctx.fillRect(this.x, this.y+this.height+5, this.healthPercent(), 4)
        this.ctx.restore()
        // *** HEALTH ***
        
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
        if (this.x <= 30){
            this.x = 30
        } else if (this.x + this.width >= CANVAS_WIDTH - 30){
            this.x = CANVAS_WIDTH - this.width - 30
        }

        if (this.y <= 130){
            this.y = 130
        } else if (this.y + this.height >= CANVAS_HEIGHT){
            this.y = CANVAS_HEIGHT - this.height
        }

        this.bullets.forEach(bullet => {
            bullet.move()
        })
    }

    animate() {
        if (this.sprite.drawCount % 7 === 0) {
            if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0
            } else {
                this.sprite.horizontalFrameIndex++
            }
            this.sprite.drawCount = 0
        }
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
            this.bullets.push(new EnemyBullet(this.ctx, this.x+(this.width/2), this.y+(this.height/2), this.vx*4, this.vy*4, this.shotPower, this.weapon, this.bulletSize))
            this.shootingCount = 0

            // Play sound
            this.sounds.enemyShot.volume = 0.05
            this.sounds.enemyShot.currentTime = 0
            this.sounds.enemyShot.play()
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
            return bullet.x + bullet.width >= 0 && bullet.x <= CANVAS_WIDTH && bullet.y + bullet.height >= 100 && bullet.y <= CANVAS_HEIGHT
        })
    }

    collidesWith(element) {
        return  this.x < element.x + element.width &&
                this.x + this.width > element.x &&
                this.y < element.y + element.height &&
                this.y + this.height > element.y
    }
}