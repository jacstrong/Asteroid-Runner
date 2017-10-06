function Hud(fuel, speed) {
    this.fuel = fuel;
    this.speed = speed;
    this.dist = 0;

    this.update = function(fuel, speed) {
        this.fuel = fuel;
        this.dist += (speed * (1/24));
    }

    this.show = function() {
        textFont("Fantasy", 18);
        fill("grey");
        rect(0, height - 80, width / 4, 80, 0, 20, 0, 0);
        fill("blue");
        rect(5, height - 75, width / 4 - 10, 30, 0, 20, 5, 0);
        fill(204, 0, 0);
        text("Dist: " + floor(str(this.dist)) + "m", 10, height - 52);
        if (this.fuel > 0) {
            if (this.fuel > 300) {
                fill(102, 255, 51);
            } else if (this.fuel > 100) {
                fill(255, 153, 0);
            } else {
                fill(204, 0, 0)
            }
            rect(0, height - 20, (width / 4) * (this.fuel / 1000), 20, 0, 5, 5, 0);
            fill(200, 20, 20)
            text(str(this.fuel), 10, height - 5);
        } else {
            fill(200, 20, 20);
            text("Out of Fuel!", 10, height - 5);
        }
    }

    this.crashed = function(){

    }
}