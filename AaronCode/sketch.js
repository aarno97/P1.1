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
    background(0,0,0);

}

function draw() {
    ellipse(500, 250, 200, 200);
    p5.select("Calendar", ["CallCalendar.html"]).position(500, 250);
}
