var default_map_img;
var school_map_img;
var work_map_img;
var default_map = false;
var school_map = false;
var work_map = false;

function setup() {
    createCanvas(1000, 500);
    background(63);
    default_map_img = loadImage('default_map.png');
    school_map_img = loadImage('school_map.png');
    work_map_img = loadImage('work_map.png');
    default_map = true;
}

function draw() {
    if ((mouseX >= 485 && mouseX <= 585) && (mouseY >= 370 && mouseY <= 420) && mouseIsPressed) {
        default_map = false;
        school_map = true;
        work_map = false;        
    }
    else if ((mouseX >= 635 && mouseX <= 735) && (mouseY >= 370 && mouseY <= 420) && mouseIsPressed) {
        default_map = false;
        school_map = false;
        work_map = true;        
    }

    if (default_map) {
        image(default_map_img, 75, 75, 850, 350);
    }
    else if (school_map) {
        image(school_map_img, 75, 75, 850, 350);
    }
    else if (work_map) {
        image(work_map_img, 75, 75, 850, 350);
    }

    fill(0);
    rect(485, 370, 100, 50);
    rect(635, 370, 100, 50);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(25);
    textFont('Courier New');    
    text('SCHOOL', 535, 395);
    text('WORK', 685, 395);
}