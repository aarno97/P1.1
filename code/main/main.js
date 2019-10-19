//globals
var state;  //current state of mirror ("inactive", "home", or name of application in fullscreen);
var video;

let capture;

/**
 * Class containing data and methods required to draw fullscreen application
 */
class App {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
    };
    draw_app_icon() {};
    draw_app_fullscreen() {};
}


function setup() {
    createCanvas(1000, 500);
    capture = createCapture(VIDEO);
    capture.size(1000, 500);
    capture.hide();  //prevents duplicate feed
}


function draw() {
    //draw webcam feed as background
    image(capture, 0, 0, 1000, 500);
    draw_home();
}


function draw_clock(x, y) {}


function draw_home() {
    fill(26, 102, 255);

    //rect(75, 75, 850, 350);
}


function draw_initial() {
    ellipse(50,50,50,50);
}
