// Some parameters
let INITIAL_MASS = 1;
let INITIAL_RADIUS = 15;
let STEP_MASS = 1.1;
let STEP_RADIUS = 1.1;
let GRAVITY_VALUE = 10;

class Ball {
    constructor(pos=new Vec2(), vel=new Vec2(), type=0, level=0) {
        this.pos = pos; // Position
        this.vel = vel; // Velocity
        this.type = type; 
        this.level = level;
        // Calculating parameters according to weird formulas
        this.mass = Math.pow(STEP_MASS, level) * INITIAL_MASS;
        this.radius = Math.pow(STEP_RADIUS, level) * INITIAL_RADIUS;

        // Some extra parameters
        this.is_alive = 1;
    }
}

class Game {
    constructor() {
        this.dt = 0.0020;
        this.gravity = new Vec2(0, 0);
        this.borders = new Vec2(600, 600);

        this.balls = [];
    }
}

Game.prototype.step = function() {
    // Gravity
    for(let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        let a = this.dt;
        ball.vel = Vec2_plus(ball.vel, Vec2_mult(this.gravity, new Vec2(a, a)));
    }

    // Ball collision
    for (let i = 0; i < this.balls.length; i++) {
        let ball_A = this.balls[i];
        for (let j = 0; j < this.balls.length; j++) {
            let ball_B = this.balls[j];
            let dist = Vec2_dist(ball_A.pos, ball_B.pos);
            let r_sum = ball_A.radius + ball_B.radius; // Sum of radiuses
            if(i == j)
                continue;
            if (dist > r_sum) // Not close enough
                continue;

            // *check types & levels*

            posNext_A = Vec2_plus(ball_A.pos, Vec2_mult(ball_A.vel, new Vec2(this.dt, this.dt)));
            posNext_B = Vec2_plus(ball_B.pos, Vec2_mult(ball_B.vel, new Vec2(this.dt, this.dt)));

            // Check are balls approaching
            let k = 1;
            if(Vec2_dist(posNext_A, posNext_B) > dist)
                k = 0.1;

            let a = Vec2_mult_num(Vec2_minus(ball_A.pos, ball_B.pos), 
                (r_sum-dist) * k *10000 / dist / ball_A.mass * this.dt);
            ball_A.vel = Vec2_plus(ball_A.vel, a);
        }   
    }

    // Wall collision
    for(let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        posNext = Vec2_plus(ball.pos, Vec2_mult(ball.vel, new Vec2(this.dt, this.dt)));
        let k = 0.5;

        // We check every border
        if (posNext.y + ball.radius > this.borders.y) // Down border
            ball.vel.y *= -k;
        if (posNext.y - ball.radius < 0) // Top border
            ball.vel.y *= -k; 
        if (posNext.x + ball.radius > this.borders.x) // Right border
            ball.vel.x *= -k;
        if (posNext.x - ball.radius < 0) // Left border
            ball.vel.x *= -k;
    }

    // Moving balls
    for(let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        let a = this.dt;
        ball.pos = Vec2_plus(ball.pos, Vec2_mult(ball.vel, new Vec2(a, a)));
    }
}

