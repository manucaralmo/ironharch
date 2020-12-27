class Joystic {
    constructor(ctx, canvas){
        this.ctx = ctx
        this.canvas = canvas

        this.x = 250
        this.y = 600
        this.radius = 25

        this.xOrigin = 250
        this.yOrigin = 600

        // =============================
        this.coord = { x: 0, y: 0 }
        this.paint = false

        // ===== final data =====
        this.joysticSpeed = undefined
        this.x_relative = undefined
        this.y_relative = undefined
        this.angle_in_degrees = undefined
    }

    draw() {
        // Bg circle
        this.ctx.save()
            this.ctx.beginPath()
            this.ctx.arc(this.xOrigin, this.yOrigin, this.radius + 20, 0, Math.PI * 2, true)
            this.ctx.fillStyle = '#00000022'
            this.ctx.fill()
        this.ctx.restore()

        // joystic
        this.ctx.save()
            this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
            this.ctx.fillStyle = '#000'
            this.ctx.fill()
        this.ctx.restore()
    }

    getPositionMouse(event) {
        this.coord.x = event.layerX;
        this.coord.y = event.layerY;
    }

    startMoving(event){
        event.preventDefault()
        this.paint = true
        this.getPositionMouse(event)
    }

    imMoving(event){
        if(this.paint){
            this.getPositionMouse(event)

            if(this.is_it_in_the_circle()){
                this.x = this.coord.x
                this.y = this.coord.y
            }

            this.passData()
        }
    }

    stopMoving() {
        this.paint = false
        this.x = this.xOrigin
        this.y = this.yOrigin
    }

    is_it_in_the_circle() {
        let current_radius = Math.sqrt(Math.pow(this.coord.x - this.xOrigin, 2) + Math.pow(this.coord.y - this.yOrigin, 2));
        if (this.radius >= current_radius){
            return true
        } else {
            return false
        }
    }

    passData() {
        let x, y
        let angle = Math.atan2((this.coord.y - this.yOrigin), (this.coord.x - this.xOrigin));

        if (Math.sign(angle) == -1) {
            this.angle_in_degrees = Math.round(-angle * 180 / Math.PI);
        }
        else {
            this.angle_in_degrees = Math.round( 360 - angle * 180 / Math.PI);
        }

        if (this.is_it_in_the_circle()) {
            x = this.coord.x;
            y = this.coord.y;
        }
        else {
            x = this.radius * Math.cos(angle) + this.xOrigin;
            y = this.radius * Math.sin(angle) + this.yOrigin;
        }

        this.joysticSpeed =  Math.round(100 * Math.sqrt(Math.pow(x - this.xOrigin, 2) + Math.pow(y - this.yOrigin, 2)) / this.radius);

        this.x_relative = Math.round(x - this.xOrigin);
        this.y_relative = Math.round(y - this.yOrigin);

        //console.log( this.x_relative, this.y_relative, this.joysticSpeed, this.angle_in_degrees);
    }
}