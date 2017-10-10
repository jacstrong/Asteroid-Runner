var cnv;

var rocket;
var hud;
var refuel;
var asteroids = [20];
var stars = [50];

var crashed = false;
var speedUpBool = false;
var pause = false;

var spaceshipImage;
var asteroidImage;
var explosionImage;
var displayFont;
var fuelImage;
var explosionSound;

var music;

var fps;
var lastSec;
var frames;


function preload() {
    spaceshipImage = loadImage("./assets/Spaceship.png");
    asteroidImage = loadImage("./assets/Asteroids.png");
    explosionImage = loadImage("./assets/Explosion.png");
    fuelImage = loadImage("./assets/Fuel.png");
    displayFont = loadFont("./assets/fonts/displayFont.ttf");
    soundFormats('mp3');
    music =  loadSound("./assets/Arpanauts.mp3");
    explosionSound = loadSound("./assets/Explosion.mp3");
}

function setup(){
    var screenWidth = windowHeight * 0.5625;
    cnv = createCanvas(screenWidth - 30, windowHeight - 30);
    cnv.id("game");
    rocket = new Rocket(spaceshipImage, explosionImage);
    for (var i = 0; i < 20; i++) {
         asteroids[i] = new Asteroid(asteroidImage);
    }
    for (var j = 0; j < 50; j++){
        stars[j] = new BackgroundStar();
    }
    hud = new Hud(rocket.getFuel(), asteroids[0].getSpeed(), displayFont);
    refuel = new Refuel(fuelImage);
    music.setVolume(0.1);
    music.play();
}

function draw(){
    background(0);
    if(lastSec != second()){
        fps = frameCount - frames;
        frames = frameCount;
        lastSec = second();
    }

    for (var j = 0; j < stars.length; j++) {
        stars[j].update();
        stars[j].show();
    }
    refuel.update(rocket.getFuel(), asteroids[0].getSpeed());
    rocket.update();
    refuel.show();
    rocket.show();
    speedUp();
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
        asteroids[i].show();
    }
    hud.update(rocket.getFuel(), asteroids[0].getSpeed());
    up_down();
    right_left();
    if (crashCheck() && !crashed) {
        crash();
    }
    if (refuelCheck()) {
        performRefuel();
    }
    hud.show();
    fill("white");
    text("FPS: " + str(fps), width/40, height/40);
    text("SPEED: " + str(floor(asteroids[0].getSpeed())), width/40 + 100, height/40)
}

function up_down() {
    rocket.setThrusters();
    if(keyIsDown(UP_ARROW)){
        rocket.up();
    } else if (keyIsDown(DOWN_ARROW)){
        rocket.down();
    } else if (keyIsDown(32)) {
        rocket.stop();
    }
}

function right_left() {
    if (keyIsDown(RIGHT_ARROW)){
        rocket.right();
    } else if (keyIsDown(LEFT_ARROW)){
        rocket.left();
    }
}

function crashCheck() {
    if(!crashed){
        for(var i = 0; i < asteroids.length; i++){
            if(asteroids[i].collision(rocket.getX(), rocket.getY())){
                return true;
            }
        }
    }
    return false;
}

function speedUp(){
    if(rocket.getY() < 100 && !speedUpBool){
        for(var i = 0; i < asteroids.length; i++){
            asteroids[i].speedUp();
        }
        speedUpBool = true;
    } else if (rocket.getY() > 100 && speedUpBool){
        for(var i = 0; i < asteroids.length; i++){
            asteroids[i].slowDown();
        }
        speedUpBool = false;
    }
}

function crash() {
    crashed = true;
    hud.crashed();
    rocket.crashed(asteroids[1].getSpeed());
    for(var i = 0; i < asteroids.length; i++){
        asteroids[i].crashed();
    }
    for(i = 0; i < stars.length; i++){
        stars[i].crash();
    }
    music.stop();
}

function refuelCheck() {
    return refuel.refuelCheck(rocket.getX(), rocket.getY());
}

function performRefuel() {
    refuel.performRefuel();
    rocket.performRefuel();
}