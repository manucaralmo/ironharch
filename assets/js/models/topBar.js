class TopBar {
    constructor(ctx){
        this.ctx = ctx
        this.x = 30
        this.y = 30

        this.height = 44
        this.width = 44

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

        this.coinImg = new Image()
        this.coinImg.src = './assets/images/icons/coin.png'
        this.coinImg.isReady = false
        this.coinImg.onload = () => {
            this.coinImg.isReady = true
        }
    }

    isReady() {
        return this.img.isReady && this.best.isReady && this.coinImg.isReady
    }

    draw(health, coins, level) {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.img,
                Math.floor(this.x),
                Math.floor(this.y),
                this.width,
                this.height
            )

            if(health < 0){ health = 0 }
            this.ctx.save()
                this.ctx.font = '30px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 4;
                this.ctx.textAlign = 'center'
                this.ctx.strokeText(`${Math.floor(health)}`, 115, 60);
                this.ctx.fillText(`${Math.floor(health)}`, 115, 60)
            this.ctx.restore()

            this.ctx.drawImage(
                this.best,
                this.x + 155,
                this.y,
                50,
                this.height
            )

            // Print Record
            if (this.record === 'undefined' || this.record === null){
                this.record = 0
            }
            this.ctx.save()
                this.ctx.font = '30px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 4;
                this.ctx.textAlign = 'left'
                this.ctx.strokeText(`Best: ${this.record}`, this.x + 225, 60);
                this.ctx.fillText(`Best: ${this.record}`, this.x + 225, 60)
            this.ctx.restore()

            // Print Coins
            this.ctx.drawImage(
                this.coinImg,
                this.x + 360,
                this.y,
                this.width,
                this.height
            )
            
            this.ctx.save()
                this.ctx.font = '30px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 4;
                this.ctx.textAlign = 'left'
                this.ctx.strokeText(coins, this.x + 420, 60);
                this.ctx.fillText(coins, this.x + 420, 60)
            this.ctx.restore()

            // Current level
            this.ctx.save()
                this.ctx.font = '30px Arial'
                this.ctx.fillStyle = 'white'
                this.ctx.strokeStyle = '#000'
                this.ctx.lineWidth = 4;
                this.ctx.textAlign = 'left'
                this.ctx.strokeText(`Level: ${level}/${Object.keys(LEVELS).length}`, this.x + 475, 60);
                this.ctx.fillText(`Level: ${level}/${Object.keys(LEVELS).length}`, this.x + 475, 60)
            this.ctx.restore()
        }
    }
}