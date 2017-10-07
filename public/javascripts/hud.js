function Hud(fuel, speed, displayFont) {
    this.fuel = fuel;
    this.speed = speed;
    this.dist = 0;
    this.crashBool = false;
    this.errorCount = 0;
    this.displayFont = displayFont;

    this.update = function(fuel, speed) {
        this.fuel = fuel;
        this.dist += (speed * (1/24));
    };

    this.show = function() {
        textFont(displayFont, 22);
        fill("grey");
        rect(0, height - 80, width / 4, 80, 0, 20, 0, 0);
        fill(255, 242, 230);
        rect(5, height - 75, width / 4 - 10, 30, 0, 20, 5, 0);
        fill(31, 46, 46);
        text("Dist: " + floor(str(this.dist)), 10, height - 52);
        if (this.fuel > 0) {
            rect(2, height - 20, (width / 4) - 5, 20, 8);
            if (this.fuel > 300) {
                fill(102, 255, 51);
            } else if (this.fuel > 100) {
                fill(255, 153, 0);
            } else {
                fill(204, 0, 0);
            }
            rect(5, height - 17, (width / 4) * (this.fuel / 1000) - 10, 14, 5);
            //fill(200, 20, 20)
            //text(str(floor(this.fuel)), 10, height - 5);
        } else {
            rect(2, height - 20, (width / 4) - 5, 20, 8);
            this.errorCount++;
            if (this.errorCount > 100){
                this.errorCount = 0;
            }
            if (this.errorCount < 50) {
                fill(204, 0, 0);
                rect(5, height - 17, (width / 4) - 10, 14, 5);
            }
        }
    };

    this.crashed = function(){
        this.crashBool = true;
    }
}