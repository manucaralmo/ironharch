class TopBar {
    constructor(ctx){
        this.ctx = ctx
        this.x = 15
        this.y = 15

        this.height = 22
        this.width = 22

        this.img = new Image()
        this.img.src = './assets/images/icons/heart.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }
    }

    isReady() {
        return this.img.isReady
    }

    draw(health) {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )

            if(health < 0){ health = 0 }
            this.ctx.save()
                this.ctx.font = '15px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.textAlign = 'center'
                this.ctx.fillText(
                `${health}`,
                60,
                30,
                )
            this.ctx.restore()
        }
    }
}