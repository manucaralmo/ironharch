class Player {
    constructor(ctx){
        this.ctx = ctx

        // Player position
        this.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2
        this.y = PLAYER_Y 

        // Previous X & Y for obstacle collision
        this.previousX = this.x
        this.previousY = this.y

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
        this.shooting = true
        this.shootingCount = 0
        this.shootingInterval = 25
        this.shotSpeed = 4

        this.extras = {
            doubleShot: false,
            doubleSpeed: false,
            extraLife: false
        }

        // Health
        this.maxHealth = 1000
        this.health = 1000
        this.collisionPower = 0.5
        this.shotPower = 10

        // Nearest Enemy
        this.nearestEnemy = undefined

        // Image
        this.sprite = new Image()
        this.sprite.src = `assets/images/player/player-2.png`
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 6
        this.sprite.verticalFrames = 4
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

        this.sounds = {
            playerWalk: new Audio('./assets/sounds/walk.mp3')
        }
    }

    isReady() {
        return this.sprite.isReady && this.img2.isReady
    }

    draw() {
        // *** Código provisional ***
        this.ctx.drawImage(
            this.img2,
            this.x-(this.width/4),
            this.y+this.width,
            this.width+(this.width/2),
            this.height/2
        )
        
        if(this.movements.up){
            this.sprite.verticalFrameIndex = 0
            this.sprite.drawCount++
            this.animate()
        } else if (this.movements.left){
            this.sprite.verticalFrameIndex = 1
            this.sprite.drawCount++
            this.animate()
        } else if (this.movements.right){
            this.sprite.verticalFrameIndex = 2
            this.sprite.drawCount++
            this.animate()
        } else if (this.movements.down){
            this.sprite.verticalFrameIndex = 3
            this.sprite.drawCount++
            this.animate()
        } else {
            this.sprite.verticalFrameIndex = 0
        }

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
        // *** Código provisional ***

         // Health Bar
        this.ctx.save()
            this.ctx.fillStyle = '#1F7E08'
            this.ctx.fillRect(this.x, this.y + this.height + 6, this.width, 5)
        this.ctx.restore()

        this.ctx.save()
            this.ctx.fillStyle = '#46CA25'
            this.ctx.fillRect(this.x, this.y + this.height + 6, this.healthPercent(), 5)
        this.ctx.restore()

        this.ctx.save()
            this.ctx.strokeStyle = '#000'
            this.ctx.strokeRect(this.x, this.y + this.height + 6, this.width, 5)
        this.ctx.restore()

        // Draw Bullets
        this.bullets.forEach(bullet => {
            bullet.draw()
        })
        if(this.shooting){
            this.shot()
        }
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

    move() {
        this.previousX = this.x
        this.previousY = this.y
        
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

            let speed = this.shotSpeed
            if(this.extras.doubleSpeed){
                speed = this.shotSpeed + 2
            } 

            // Crear nuevo bullet
            this.bullets.push(new Bullet(this.ctx, this.x+(this.width/2), this.y, Math.sin(angle)*speed, Math.cos(angle)*speed, this.shotPower))
            // Crear nuevo bullet si tiene doble disparo
            if(this.extras.doubleShot){
                this.bullets.push(new Bullet(this.ctx, this.x+(this.width/2)- 25, this.y, Math.sin(angle)*speed, Math.cos(angle)*speed, this.shotPower))
            }
            this.shootingCount = 0
        }
        this.shootingCount++
        // Clean bullets
        this.clearBullets()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => {
            return bullet.x + bullet.width >= 0 && bullet.x <= CANVAS_WIDTH && bullet.y + bullet.height >= 100 && bullet.y <= CANVAS_HEIGHT
        })
    }

    onKeyEvent(event) {
        // If keydown --> status = True / else status = false
        const status = event.type === 'keydown'

        if(status){
            this.sounds.playerWalk.volume = 0.2
            this.sounds.playerWalk.play()
        }

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


    // Mobile events
    onTouchEvent(event) {
        // seteamos el status de shooting
        this.shooting = !status

        switch(event) {
        case 'top':
            this.movements.up = true
            this.shooting = false
            break
        case 'right':
            this.movements.right = true
            this.shooting = false
            break
        case 'bottom':
            this.movements.down = true
            this.shooting = false
            break
        case 'left':
            this.movements.left = true
            this.shooting = false
            break
        case 'stop':
            this.movements.up = false
            this.movements.right = false
            this.movements.down = false
            this.movements.left = false
            this.shooting = true
            break
        }
    }

    collidesWith(element) {
        return  this.x < element.x + element.width &&
                this.x + this.width > element.x &&
                this.y < element.y + element.height &&
                this.y + this.height > element.y
    }

    collidesWithObstacle(element) {
        if( this.y <= element.y + element.height && 
            this.y >= element.y && 
            this.x + this.width >= element.x && 
            this.x <= element.x + element.width &&
            this.y + this.height > element.y + element.height && 
            this.previousY > element.y + element.height){
                this.y = element.y + element.height + 1
                this.vy = 0
            return 'down'
        } else if ( this.y + this.height >= element.y &&
            this.y + this.height <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y < element.y &&
            this.previousY + this.height <= element.y){
                this.y = element.y - this.height - 1
                this.vy = 0
            return 'up'
        }else if ( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x < element.x &&
            this.previousX +  this.width < element.x){
                this.x  = element.x - this.width - 1
                this.vx = 0
            return 'left'
        } else if ( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x <= element.x + element.width &&
            this.x + this.width > element.x + element.width &&
            this.previousX > element.x + element.width){
                    this.x  = element.x + element.width + 1
                    this.vx = 0
            return 'right'
        }
    }

}