class Gift {
    constructor(ctx){
        this.ctx = ctx
        this.x = 260
        this.y = 280

        this.height = 150
        this.width = 250

        this.collides = false

        this.img = new Image()
        this.img.src = './assets/images/icons/gift.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }

        // Image Shadow
        this.img2 = new Image()
        this.img2.src = './assets/images/enemies/shadow.png'
        this.img2.isReady = false
        this.img2.onload = () => {
            this.img2.isReady = true
        }
    }

    isReady() {
        return this.img.isReady && this.img2.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.img2,
                this.x-(this.width/4),
                this.y+this.height - 15,
                this.width+(this.width/2),
                this.height/2
            )

            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }

    collidesWith(element) {
        return  this.x < element.x + element.width &&
                this.x + this.width > element.x &&
                this.y < element.y + element.height &&
                this.y + this.height > element.y
    }
}