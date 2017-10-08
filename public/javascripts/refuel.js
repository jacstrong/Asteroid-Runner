function Refuel(fuelImage) {
    this.pos = createVector( 80, -200);
    this.fuelImage = fuelImage;
    this.fuel = 1000;
    this.speed = 0;
    this.r = 30;
    this.lastRefuel = 0;
    this.refuelBool = false;
    this.imageCount = 0;
    this.pickup = false;

    this.show = function() {
        imageMode(CENTER);
        this.imageCount++;
        if (this.imageCount < 100) {
            image(fuelImage, this.pos.x, this.pos.y, this.r, this.r, 0, 0, 105, 105);
        } else {
            image(fuelImage, this.pos.x, this.pos.y, this.r, this.r, 120, 0, 105, 105);
        }

        if (this.imageCount > 150) {
            this.imageCount = 0;
        }
    };

    this.update = function(fuel, speed) {
        this.fuel = fuel;
        this.lastRefuel++;


        if (this.lastRefuel > 2000 && !this.refuelBool) {
            this.refuelBool = true;
        }
        if(this.refuelBool){
            this.pos.y += speed;
            if (this.pos.y > height + 100) {
                this.refuelBool = false;
                this.lastRefuel = 0;
            }
        }
    };

    this.refuelCheck = function(rocketX, rocketY) {
        var d = dist(this.pos.x, this.pos.y, rocketX, rocketY);
        return (d < this.r + 15);
    };

    this.performRefuel = function() {
        this.pos.x = random(0, width);
        this.pos.y = -200;
        this.lastRefuel = 0;
        this.refuelBool = false;
    };
}