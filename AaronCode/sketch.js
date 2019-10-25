import * as p5 from '/Users/aaronarnold/Library/Mobile Documents/com~apple~CloudDocs/7th Semester/Human Computer Interaction/p5';

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
    background(213, 224, 242);

}

function draw() {
    ellipse(500, 250, 100, 100);
    p5.select('Calendar').position(250, 250);
}
