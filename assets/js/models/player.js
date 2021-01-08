class Player {
    constructor(ctx, playerImg = 1){
        // Canvas CTX
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
        this.shotSpeed = 8

        // Extras config
        this.extras = {
            doubleShot: false,
            doubleSpeed: false,
            extraLifeCount: 0
        }

        // Health
        this.maxHealth = 1000
        this.health = 1000
        this.collisionPower = 0.5
        this.shotPower = 10

        // Nearest Enemy
        this.nearestEnemy = undefined

        // ==== IMAGES & SPRITES ====
        // Image
        this.sprite = new Image()
        this.sprite.src = `assets/images/player/player-${playerImg}.png`
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 6
        this.sprite.verticalFrames = 4
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
        this.img2.src = './assets/images/player/blue-shadow.png'
        this.img2.isReady = false
        this.img2.onload = () => {
            this.img2.isReady = true
        }

        // Level up text
        this.img3 = new Image()
        this.img3.src = './assets/images/icons/level-up-text.png'
        this.img3.isReady = false
        this.img3.onload = () => {
            this.img3.isReady = true
        }

        // ==== SOUNDS ====
        this.sound = true
        this.sounds = {
            playerWalk: new Audio('./assets/sounds/walk.mp3'),
            shot: new Audio('./assets/sounds/player-shot-grave.mp3')
        }

        this.levelUpText = false
    }

    isReady() {
        return this.sprite.isReady && this.img2.isReady && this.img3.isReady
    }

    draw() {
        // Draw Bullets
        if(this.bullets.length > 0){
            this.bullets.forEach(bullet => {
                bullet.draw()
            })
        }

        // Draw Shadow
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
            // Si hay enemigos cercanos
            if(this.nearestEnemy !== undefined){
                if((this.y - this.nearestEnemy.y) < 200 && this.nearestEnemy.x < this.x){
                    // Mirar a la izquierda
                    this.sprite.verticalFrameIndex = 1
                } else if ((this.y - this.nearestEnemy.y) < 200 && this.nearestEnemy.x > this.x){
                    // Mirar a la derecha
                    this.sprite.verticalFrameIndex = 2
                } else if (this.nearestEnemy.y < this.y){
                    // Mirar arriba
                    this.sprite.verticalFrameIndex = 0
                } else {
                    // Mirar abajo
                    this.sprite.verticalFrameIndex = 3
                }
            } else {
                this.sprite.verticalFrameIndex = 0
            }
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

        // Health Bar
        if(this.healthPercent() !== undefined){
            this.ctx.save()
                this.ctx.fillStyle = '#1F7E08'
                this.ctx.fillRect(this.x, this.y + this.height + 6, this.width, 10)
            this.ctx.restore()
            this.ctx.save()
                this.ctx.fillStyle = '#46CA25'
                this.ctx.fillRect(this.x, this.y + this.height + 6, this.healthPercent(), 10)
            this.ctx.restore()
            this.ctx.save()
                this.ctx.strokeStyle = '#000'
                this.ctx.strokeRect(this.x, this.y + this.height + 6, this.width, 10)
            this.ctx.restore()
        }

        // Level up text
        if(this.levelUpText){
            this.ctx.drawImage(
                this.img3,
                this.x - 4,
                this.y - 20,
                this.width + 16,
                35
            )
        }

        // Shot
        if(this.shooting){
            this.shot()
        }
    }

    animate() {
        if (this.sprite.drawCount % this.sprite.drawInterval === 0) {
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
        if (this.x <= 50){
            this.x = 50
        } else if (this.x + this.width >= CANVAS_WIDTH - 50){
            this.x = CANVAS_WIDTH - this.width - 50
        }

        if (this.y <= 260){
            this.y = 260
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

            // Crear nuevo bullet si tiene doble disparo
            if(this.extras.doubleShot){
                // Crear nuevo bullet
                this.bullets.push(new Bullet(this.ctx, this.x+(this.width/2 - 18), this.y, Math.sin(angle)*speed, Math.cos(angle)*speed, this.shotPower))
                this.bullets.push(new Bullet(this.ctx, this.x+(this.width/2) - 52, this.y, Math.sin(angle)*speed, Math.cos(angle)*speed, this.shotPower))
            } else {
                this.bullets.push(new Bullet(this.ctx, this.x+(this.width/2 - 35), this.y, Math.sin(angle)*speed, Math.cos(angle)*speed, this.shotPower))
            }
            this.shootingCount = 0

            if(this.sound){
                this.sounds.shot.volume = 0.2
                this.sounds.shot.play()
            }

        }
        this.shootingCount++
        // Clean bullets
        this.clearBullets()
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => {
            return bullet.x + bullet.width >= 0 && bullet.x <= CANVAS_WIDTH && bullet.y + bullet.height >= 200 && bullet.y <= CANVAS_HEIGHT
        })
    }

    onKeyEvent(event) {
        // If keydown --> status = True / else status = false
        const status = event.type === 'keydown'

        if(status && this.sound){
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

    // ==================================
    // CHECK COLLISIONS
    // ==================================
    collidesWith(element) {
        return  this.x < (element.x + 30) + (element.width - 60) &&
                this.x + this.width > (element.x + 30) &&
                this.y < (element.y + 30) + (element.height - 60) &&
                this.y + this.height > (element.y + 30)
    }

    collidesWithObstacle(element) {
        // -60 para que el personaje de sensacion de 3d con el obstaculo
        if( this.y <= element.y + (element.height - 60) && 
            this.y >= element.y && 
            this.x + this.width >= (element.x + 15) && 
            this.x <= (element.x + 15) + (element.width - 30) &&
            this.y + this.height > element.y + (element.height - 60) && 
            this.previousY > element.y + (element.height - 60)){
                this.y = element.y + (element.height - 60) + 1
                this.vy = 0
            return 'down'
        } else if ( this.y + this.height >= element.y &&
            this.y + this.height <= element.y + (element.height - 60) &&
            this.x + this.width >= (element.x + 15) &&
            this.x <= (element.x + 15) + (element.width - 30) &&
            this.y < element.y &&
            this.previousY + this.height <= element.y){
                this.y = element.y - this.height - 1
                this.vy = 0
            return 'up'
        }else if ( this.y + this.height >= element.y &&
            this.y <= element.y + (element.height - 60) &&
            this.x + this.width >= (element.x + 15) &&
            this.x < (element.x + 15) &&
            this.previousX +  this.width < (element.x + 15)){
                this.x  = (element.x + 15) - this.width - 1
                this.vx = 0
            return 'left'
        } else if ( this.y + this.height >= element.y &&
            this.y <= element.y + (element.height - 60) &&
            this.x <= (element.x + 15) + (element.width - 30) &&
            this.x + this.width > (element.x + 15) + (element.width - 30) &&
            this.previousX > (element.x + 15) + (element.width - 30)){
                    this.x  = (element.x + 15) + (element.width - 30) + 1
                    this.vx = 0
            return 'right'
        }
    }

}