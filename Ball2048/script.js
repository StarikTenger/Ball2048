// Canvas
let SCREEN = document.getElementById("screen");
SCREEN.width = SCREEN.height = 600;
let CTX = SCREEN.getContext("2d");

var game = new Game();
var draw = new Draw(CTX);


function step() {
    for (let i =0; i<10; i++)
        game.step();
    draw.draw(game);
}

var interval = setInterval(step, 20);