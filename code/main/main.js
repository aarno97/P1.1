//globals
var state;  //current state of mirror ("inactive", "home", or name of application in fullscreen);
var video;

/**
 * Class containing data and methods required to draw fullscreen application
 */
class App {
    constructor(name) {
        this.name = name;
    };
    draw_app() {};
}


function setup() {
    createCanvas(1000, 500);
    video = createCapture(VIDEO);
    video.size(320, 240);
}


function draw() {
    background(255, 255, 255);
    image(video, 0, 0);
    fill(26, 102, 255);

    rect(75, 150, 925, 775);
}


function draw_clock(x, y) {};


function draw_home() {};
