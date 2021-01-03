class Bullet {
    constructor(ctx, x, y, vx, vy, bulletPower, weapon = 'arma1'){
        // CTX
        this.ctx = ctx

        // Position & speed
        this.x = x
        this.y = y
        this.vy = vy
        this.vx = vx

        // Dimensions
        this.width = 70
        this.height = 70

        // Extra
        this.collides = undefined
        this.power = bulletPower

        // Weapon
        this.weapon = weapon

        // Image
        this.sprite = new Image()
        this.sprite.src = `assets/images/bullets/${weapon}.png`
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 6
        this.sprite.verticalFrames = 1
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor((this.sprite.width) / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor((this.sprite.height) / this.sprite.verticalFrames)
        }
    }

    isReady() {
        return this.sprite.isReady
    }

    draw() {
        if (this.isReady()) {
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

            this.sprite.drawCount++
            this.animate()
        }
    }  

    animate() {
        if (this.sprite.drawCount % 2 === 0) {
            if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0
            } else {
                this.sprite.horizontalFrameIndex++
            }
            this.sprite.drawCount = 0
        }
    }

    move() {
        // Move bullet
        this.x += this.vx
        this.y += this.vy
    }
}