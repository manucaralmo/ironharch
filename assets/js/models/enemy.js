class Enemy {
    constructor(ctx, x, y, isMoving = false, shootingInterval = 115, shotPower = 500, collisionPower = 1, health, weapon, bulletSize, enemyImg = 5, speedV = 1){
        // Ctx
        this.ctx = ctx

        // Enemy position & Size
        this.x = x
        this.y = y
        this.width = 104
        this.height = 140

        // Previous X & Y for obstacle collision
        this.previousX = this.x
        this.previousY = this.y

        // Enemy Speed 
        this.isMoving = isMoving
        this.vy = 0
        this.vx = 0
        this.dx = 0
        this.dy = 0
        this.angle = undefined

        // state -- Check if is shooting or not
        this.state = 'normal'

        // Health & power
        this.maxHealth = health
        this.health = health
        this.collisionPower = collisionPower // Poder de colision
        this.shotPower = shotPower // Poder de colision
        this.speedV = speedV*2

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

        // Collides
        this.collides = {
            topBottom: false,
            leftRight: false
        }

        // ==== IMAGES & SPRITES ====
        // Image
        this.sprite = new Image()
        this.sprite.src = `assets/images/enemies/enemy-${enemyImg}.png`
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 6
        this.sprite.verticalFrames = 3
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0
        this.sprite.drawInterval = 7

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

        // ==== SOUNDS ====
        this.sound = true
        this.sounds = {
            enemyShot: new Audio('assets/sounds/disparo-enemigo.mp3')
        }
    }

    isReady() {
        return this.sprite.isReady && this.img2.isReady
    }

    draw() {
        // If is moving -- VerticalFrame 1
        if(this.isMoving && this.state === 'normal'){
            this.sprite.verticalFrameIndex = 1
        }

        // If img & sprite are Ready, draw
        if (this.isReady()) {
            // Draw Shadow
            this.ctx.drawImage(
                this.img2,
                this.x-(this.width/4),
                this.y+this.width,
                this.width+(this.width/2),
                this.height/2
            )
            // Draw Enemy
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
        }

        // Draw Health
        if(this.healthPercent() !== undefined){
            this.ctx.save()
                this.ctx.fillStyle = '#921010'
                this.ctx.fillRect(this.x, this.y+this.height+5, this.width, 8)
            this.ctx.restore()
            this.ctx.save()
                this.ctx.fillStyle = '#DD1515'
                this.ctx.fillRect(this.x, this.y+this.height+5, this.healthPercent(), 8)
            this.ctx.restore()
        }
        
        // Draw Bullets
        if(this.bullets.length > 0){
            this.bullets.forEach(bullet => {
                bullet.draw()
            })
        }
    }

    move() {
        // Previous position for collision check
        this.previousX = this.x
        this.previousY = this.y

        // Animate sprite
        if(this.sprite.verticalFrameIndex !== 0){
            this.sprite.drawCount++
            this.animate()
        }

        // Move Enemy
        if(this.isMoving){
            this.getPlayerAngle()
            this.x += this.vx * this.speedV
            this.y += this.vy * this.speedV
        }

        // Shot
        this.shot()

        // Move bullets
        if(this.bullets.length > 0){
            this.bullets.forEach(bullet => {
                bullet.move()
            })
        }

        // === Check canvas collisions ===
        if (this.x <= 30){
            this.x = 30
        } else if (this.x + this.width >= CANVAS_WIDTH - 30){
            this.x = CANVAS_WIDTH - this.width - 30
        }
        if (this.y <= 260){
            this.y = 260
        } else if (this.y + this.height >= CANVAS_HEIGHT){
            this.y = CANVAS_HEIGHT - this.height
        }
    }

    animate() {
        if (this.sprite.drawCount % this.sprite.drawInterval === 0 && this.isReady()) {
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

            // Shot Animation
            this.shotAnimation()

            // Crear nuevo bullet
            this.bullets.push(new EnemyBullet(this.ctx, this.x+(this.width/2), this.y+(this.height/2), this.vx*8, this.vy*8, this.shotPower, this.weapon, this.bulletSize))
            this.shootingCount = 0

            // Play sound
            if(this.sound){
                this.sounds.enemyShot.load()
                this.sounds.enemyShot.volume = 0.05
                this.sounds.enemyShot.currentTime = 0
                this.sounds.enemyShot.play()
            }
            
        }
        this.shootingCount++
        // Clean bullets
        this.clearBullets()
    }

    shotAnimation() {
        // Change state 
        this.state = 'shooting'
        // Change vertical index 
        this.sprite.verticalFrameIndex = 2
        // TimeOut para dar tiempo a que se vea la animación
        setTimeout(() => {
            // Reset vertical index 
            if(this.isMoving){
                this.sprite.verticalFrameIndex = 1
            } else {
                this.sprite.verticalFrameIndex = 0
                this.sprite.horizontalFrameIndex = 0
            }
            // Reset state
            this.state = 'normal'
        }, 500)
    }

    getPlayerAngle() {
        // Calcular angulo para el disparo
        this.dx = this.playerX - this.x
        this.dy = this.playerY - this.y
        this.angle = Math.atan2(this.dx, this.dy)

        // Set vx & vy
        this.vx = Math.sin(this.angle)
        this.vy = Math.cos(this.angle)
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => {
            return bullet.x + bullet.width >= 0 && bullet.x <= CANVAS_WIDTH && bullet.y + bullet.height >= 200 && bullet.y <= CANVAS_HEIGHT
        })
    }

    collidesWith(element) {
        return  this.x < (element.x + 30) + (element.width - 60) &&
                this.x + this.width > (element.x + 30) &&
                this.y < (element.y + 30) + (element.height - 60) &&
                this.y + this.height > (element.y + 30)
    }

    collidesWithObstacle(element) {
        if( this.y <= element.y + (element.height - 60) && 
            this.y >= element.y && 
            this.x + this.width >= element.x && 
            this.x <= element.x + element.width &&
            this.y + this.height > element.y + (element.height - 60) && 
            this.previousY >= element.y + (element.height - 60)){
                this.y = element.y + (element.height - 60)
                this.vy = 0
                this.collides.topBottom = true
            return 'down'
        } else if ( this.y + this.height >= element.y &&
            this.y + this.height <= element.y + (element.height - 60) &&
            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y < element.y &&
            this.previousY + this.height <= element.y){
                this.y = element.y - this.height
                this.vy = 0
                this.collides.topBottom = true
            return 'up'
        }else if ( this.y + this.height >= element.y &&
            this.y <= element.y + (element.height - 60) &&
            this.x + this.width >= element.x &&
            this.x < element.x &&
            this.previousX +  this.width <= element.x){
                this.x  = element.x - this.width
                this.vx = 0
                this.collides.leftRight = true
            return 'left'
        } else if ( this.y + this.height >= element.y &&
            this.y <= element.y + (element.height - 60) &&
            this.x <= element.x + element.width &&
            this.x + this.width > element.x + element.width &&
            this.previousX >= element.x + element.width){
                    this.x  = element.x + element.width
                    this.vx = 0
                    this.collides.leftRight = true
            return 'right'
        } else {
            this.collides.leftRight = false
            this.collides.topBottom = false
            return false
        }
    }
}