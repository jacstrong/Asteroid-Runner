var rocket;
var hud;
var asteroids = [20];
var stars = [30];

var crashed = false;
var speedUpBool = false;

var spaceshipImage;
var asteroidImage;
var explosionImage;

var music;

function preload() {
    spaceshipImage = loadImage("./assets/Spaceship.png");
    asteroidImage = loadImage("./assets/Asteroids.png");
    explosionImage = loadImage("./assets/Explosion.png");
    soundFormats('mp3');
    music =  loadSound("./assets/Arpanauts.mp3");
}

function setup(){
    //var screenWidth = windowHeight * 0.5625;
    createCanvas(600, 800);
    rocket = new Rocket(300, height - 60, spaceshipImage, explosionImage);
    for (var i = 0; i < 20; i++) {
         asteroids[i] = new Asteroid(asteroidImage);
    }
    for (var j = 0; j < 30; j++){
        stars[j] = new BackgroundStar();
    }
    hud = new Hud(rocket.getFuel(), asteroids[0].getSpeed());
    music.setVolume(0.1);
    music.play();
}

function draw(){
    background(0);
    for (var j = 0; j < stars.length; j++){
        stars[j].show();
        stars[j].update();
    }
    rocket.show();
    rocket.update();
    speedUp();
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].show();
        asteroids[i].update();
    }
    hud.update(rocket.getFuel(), asteroids[0].getSpeed());
    hud.show();
    up_down();
    right_left();
    if(crashCheck() && !crashed){
        crash();
        console.log("I crashed");
    }
}

function up_down() {
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
    rocket.crashed(asteroids[1].getSpeed());
    hud.crashed();
    for(var i = 0; i < asteroids.length; i++){
        asteroids[i].crashed();
    }
    for(i = 0; i < stars.length; i++){
        stars[i].crash();
    }

}