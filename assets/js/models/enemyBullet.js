class EnemyBullet extends Bullet {
    constructor(ctx, x, y, vx, vy){
        super(ctx, x, y, vx, vy)
    }

    draw() {
        // *** Código provisional ***
        this.ctx.save()
            this.ctx.fillStyle = 'white'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.restore()
        // *** Código provisional ***
    }
}