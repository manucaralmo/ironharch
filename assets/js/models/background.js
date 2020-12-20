class Background {
    constructor(ctx){
        this.ctx = ctx

        this.x = 0
        this.y = 0
        this.height = this.ctx.canvas.height
        this.width = this.ctx.canvas.width

        this.img = new Image()
        this.img.src = './assets/images/backgrounds/level-2.jpg'
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