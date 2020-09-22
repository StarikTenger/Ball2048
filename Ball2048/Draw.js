
// This class is responsible for drawing
class Draw {
    constructor(ctx) {
       this.ctx = ctx;

       this.cam = new Vec2(0, 0); // Camera position
       this.center = new Vec2(0, 0); // Screen center (здфнукы ы)
    }
}

Draw.prototype.image = function(texture, x, y, w, h, flip) {
    if(!flip)
        flip = 0;
        
    this.ctx.save();
    let width = 1;
    if (flip) {
        this.ctx.scale(-1, 1);
        width = -1;
    }
    this.ctx.imageSmoothingEnabled = 0;
    this.ctx.drawImage(texture, 
        width*(x + w * flip - this.cam.x + this.center.x), 
        (y - this.cam.y + this.center.y), 
        w , h);
    this.ctx.restore();
};

Draw.prototype.rect = function(x, y, w, h, color) {
    this.ctx.imageSmoothingEnabled = 0;
    this.ctx.fillStyle = color;
    this.ctx.fillRect((x - this.cam.x + this.center.x), (y - this.cam.y + this.center.y), w, h);
};

Draw.prototype.circle = function(x, y, r, color) {
    this.ctx.beginPath();
    this.ctx.arc((x - this.cam.x + this.center.x), (y - this.cam.y + this.center.y), r, 0 , 10);
    this.ctx.fillStyle = color;
    this.ctx.fill();
}

Draw.prototype.draw = function(game) {

    // Focusing camera
    this.cam = new Vec2(0, 0);
    this.center = new Vec2(0, 0);

    // Filling background
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 10000, 10000);

    // Draw balls
    for (let i = 0; i < game.balls.length; i++) {
        let ball = game.balls[i];
        // this.rect(ball.pos.x, ball.pos.y, ball.radius, ball.radius, "white");
        this.circle(ball.pos.x, ball.pos.y, ball.radius, "white")
    }
};