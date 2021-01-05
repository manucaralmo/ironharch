class Obstacle {
    constructor(ctx, x, y, type){
        this.ctx = ctx
        this.x = x
        this.y = y

        this.height = 100
        this.width = 70

        this.type = type

        this.img = new Image()
        this.img.src = `./assets/images/obstacles/${this.type}.png`
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

    collidesWith(element) {
        return  this.x < (element.x + 15) + (element.width - 30) &&
                this.x + this.width > (element.x + 15) &&
                this.y < element.y + element.height &&
                this.y + this.height > element.y
    }
}