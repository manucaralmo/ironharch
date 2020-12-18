class Bullet {
    constructor(ctx, x, y, vx, vy){
        // CTX
        this.ctx = ctx

        // Position & speed
        this.x = x
        this.y = y
        this.vy = vy
        this.vx = vx

        // Dimensions
        this.width = 9
        this.height = 9

        // Extra
        this.collides = undefined // no se
        this.power = 10
    }

    draw() {
        // *** Código provisional ***
        this.ctx.save()
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.restore()
        // *** Código provisional ***
    }

    move() {
        // Move bullet
        this.x += this.vx
        this.y += this.vy
    }
}