class Obstacle {
    constructor(ctx){
        this.ctx = ctx
        this.x = 105
        this.y = 325

        this.height = 60
        this.width = 45

        this.img = new Image()
        this.img.src = './assets/images/obstacles/obstacle.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }
    }

    isReady() {
        return this.img.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }
}