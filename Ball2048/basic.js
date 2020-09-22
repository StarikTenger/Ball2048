//// 2D vector ////
class Vec2 {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
}

// +
function Vec2_plus(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
}

// -
function Vec2_minus(a, b) {
    return new Vec2(a.x - b.x, a.y - b.y);
}

// Multiply
function Vec2_mult(a, b) {
    return new Vec2(a.x * b.x, a.y * b.y);
}

// Divide
function Vec2_div(a, b) {
    return new Vec2(a.x / b.x, a.y / b.y);
}

// Multiply by number
function Vec2_mult_num(a, b) {
    return new Vec2(a.x * b, a.y * b);
}

// Divide by number
function Vec2_div_num(a, b) {
    return new Vec2(a.x / b, a.y / b);
}

// Moule
function Vec2_abs(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}

// Distance
function Vec2_dist(a, b) {
    var x = a.x - b.x;
    var y = a.y - b.y;
    return Math.sqrt(x * x + y * y);
}

//// RANDOM ////

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function random_float(min, max) {
    return (Math.random() * (max - min) + min);
}

function normal_distribution(min, max, iterations) {
    var sum = 0;
    for (var i = 0; i < iterations; i++)
        sum += random(min, max);
    return Math.round(sum / iterations);
}
