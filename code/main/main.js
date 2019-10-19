// full screen size for apps is going to be 850 x 350

//globals
var state;  //current state of mirror ("inactive", "home", or name of application in fullscreen);
var video;

let capture;

/**
 * Class containing data and methods required to draw fullscreen application
 */
class App {
    constructor(name, icon, pos) {
        this.name = name;
        this.icon = icon;
        this.pos = pos;
    }
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
    //draw_clock(75, 75);
    //draw_initial();
}


function draw_clock(x, y) {
    
};


function draw_home() {
    fill(255, 255, 255);
    ellipse(125, 435, 75, 75);
    ellipse(250, 435, 75, 75);
    ellipse(375, 435, 75, 75);
    ellipse(500, 435, 75, 75);
    ellipse(625, 435, 75, 75);
    ellipse(750, 435, 75, 75);

    fill(77,77,77)
    ellipse(875, 435, 75, 75);

}


function draw_initial() {
    ellipse(960,460,50,50);
}
