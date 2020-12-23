class Background {
    constructor(ctx, bgimg = 1){
        this.ctx = ctx

        this.x = 0
        this.y = 0
        this.height = this.ctx.canvas.height
        this.width = this.ctx.canvas.width

        this.bgimg = bgimg

        this.img = new Image()
        this.img.src = `./assets/images/backgrounds/level-${this.bgimg}.jpg`
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