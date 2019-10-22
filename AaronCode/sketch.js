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
    let calendar = new Calendar(calendarEl, {
        plugins: [ googleCalendarPlugin ],
        googleCalendarApiKey: 'AIzaSyA2NJZvTatDvC8SVJnfZ4wXwH3sdjac9so',
        events: {
            googleCalendarId: 'mfjsnor8bvj6c4a0vshb24g7sk@group.calendar.google.com',
            className: 'gcal-event'
        }
    });
}