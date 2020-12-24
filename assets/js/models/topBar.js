class TopBar {
    constructor(ctx){
        this.ctx = ctx
        this.x = 15
        this.y = 15

        this.height = 22
        this.width = 22

        this.record = localStorage.getItem("IronHarchRecord");

        this.img = new Image()
        this.img.src = './assets/images/icons/heart.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }

        this.best = new Image()
        this.best.src = './assets/images/icons/best.png'
        this.best.isReady = false
        this.best.onload = () => {
            this.best.isReady = true
        }
    }

    isReady() {
        return this.img.isReady && this.best.isReady
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
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 2;
                this.ctx.textAlign = 'center'
                this.ctx.strokeText(`${health}`, 60, 30);
                this.ctx.fillText(`${health}`, 60, 30)
            this.ctx.restore()

            this.ctx.drawImage(
                this.best,
                this.x + 75,
                this.y,
                25,
                this.height
            )

            // Print Record
            if (this.record === 'undefined' || this.record === null){
                this.record = 0
            }
            this.ctx.save()
                this.ctx.font = '15px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 2;
                this.ctx.textAlign = 'left'
                this.ctx.strokeText(`Best: ${this.record}`, this.x + 75 + 35, 30);
                this.ctx.fillText(`Best: ${this.record}`, this.x + 75 + 35, 30)
            this.ctx.restore()
        }
    }
}