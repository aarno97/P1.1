let Calendar, State, Move, Sleep, Exercise, Stand, Step, Image;

function setup() {
    createCanvas(1000, 500);
    background(228, 229, 240);
    Calendar = loadImage("Calendar.png");
    Move = loadImage("Move Goal.png");
    Sleep = loadImage("Stand Goal.png");
    Exercise = loadImage("Exercise Goal.png");
    Stand = loadImage("Stand Goal.png");
    Step = loadImage("Step Goal.png");
    Image = loadImage("Step Goal.png");
}

function draw() {
    State = "Calendar";
    rect(75, 75, 850, 350);
    // switch (String(State)) {
    //     case "Calendar":
    //         Image = Calendar;
    //         break;
    //     case "Move":
    //         Image = Move;
    //         break;
    //     case "Exercise":
    //         Image = Exercise;
    //         break;
    //     case "Stand":
    //         Image = Stand;
    //         break;
    //     case "Step":
    //         Image = Step;
    //         break;
    //     case "Sleep":
    //         Image = Sleep;
    //         break;
    //     default:
    //         Image = Calendar;
    //         break;
    // }
    if (Image != null) {
        image(Image, 75, 75, 850, 350);
    }
}
