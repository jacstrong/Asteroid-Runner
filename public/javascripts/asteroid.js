function Asteroid(asteroidImgae) {
    this.pos = createVector(random(0,width), random(-600,height - 400));
    this.r = random(20, 40);
    this.speed = 0;
    this.speedX = random(-0.1, 0.1);
    this.speedY = random(-0.1, 0.1);
    this.speedMultiplier = 0.0008;
    this.asteroidImgae = asteroidImgae;
    this.asteroidPick = floor(random(1,4));
    this.rotation = random(-1, 1);
    this.speedUpDif = 1.3;

    this.show = function() {
        //fill("blue");
        //ellipseMode(RADIUS);
        //ellipse(this.pos.x, this.pos.y, this.r);
        imageMode(CENTER);
        switch (this.asteroidPick) {
            case 1:
                image(this.asteroidImgae, this.pos.x, this.pos.y, this.r * 2, this.r * 2, 0, 0, 280, 300);
                break;
            case 2:
                image(this.asteroidImgae, this.pos.x, this.pos.y, this.r * 2, this.r * 2, 370, 0, 410, 400);
                break;
            case 3:
                image(this.asteroidImgae, this.pos.x, this.pos.y, this.r * 2, this.r * 2, 0, 365, 280, 300);
                break;
            case 4:
                image(this.asteroidImgae, this.pos.x, this.pos.y, this.r * 2, this.r * 2, 400, 430, 430, 450);
                break;
            default:
                //image(this.asteroidImgae, this.pos.x, this.pos.y, this.r * 2, this.r * 2, 0, 0, 300, 300);
        }
    };

    this.update = function() {
        this.speed += this.speedMultiplier;
        this.pos.y += this.speed + this.speedY;
        this.pos.x += this.speedX;

        if(this.pos.y > height + 40){
            this.pos.x = random(0, width);
            this.pos.y = random(-200,-50);
            this.r = random(20, 40);
        }
    };

    this.getX = function() {
        return this.pos.x;
    };

    this.getY = function() {
        return this.pos.y;
    };

    this.getSpeed = function() {
        return this.speed;
    };

    this.speedUp = function() {
      this.speed *= this.speedUpDif;
    };

    this.slowDown = function() {
        this.speed /= this.speedUpDif;
    }

    this.collision = function(x, y) {
        var d = dist(this.pos.x, this.pos.y, x, y);
        return (d < this.r + 15);
    };

    this.crashed = function(){
        this.speedMultiplier = 0;
        this.speed = 0;
    };
}