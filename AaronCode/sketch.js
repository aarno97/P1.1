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

}

function draw() {
    ellipse(500, 250, 100, 100);
}