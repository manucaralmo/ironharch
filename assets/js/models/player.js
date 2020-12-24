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
        this.img = new Image()
        this.img.src = './assets/images/player/1.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }

        this.sounds = {
            playerWalk: new Audio('./assets/sounds/walk.mp3')
        }
    }

    isReady() {
        return this.img.isReady
    }

    draw() {
        // *** Código provisional ***
        this.ctx.save()
            this.ctx.fillStyle = '#000'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.restore()

        this.ctx.save()
            this.ctx.fillStyle = '#1F7E08'
            this.ctx.fillRect(this.x, this.y + this.height + 6, this.width, 5)
        this.ctx.restore()

        this.ctx.save()
            this.ctx.fillStyle = '#46CA25'
            this.ctx.fillRect(this.x, this.y + this.height + 6, this.healthPercent(), 5)
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

    healthPercent(){
        let percent = (this.health * 100)/this.maxHealth
        return percent * this.width / 100
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
            //this.sounds.playerWalk.volume = 0.2
            //this.sounds.playerWalk.play()
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
            this.y + this.height > element.y + element.height ){
            return 'down'
        } else if ( this.y + this.height >= element.y &&
            this.y + this.height <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x <= element.x + element.width &&
            this.y < element.y){
            return 'up'
        }else if ( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x + this.width >= element.x &&
            this.x < element.x){
            return 'left'
        } else if ( this.y + this.height >= element.y &&
            this.y <= element.y + element.height &&
            this.x <= element.x + element.width &&
            this.x + this.width > element.x + element.width ){
            return 'right'
        }
    }

}