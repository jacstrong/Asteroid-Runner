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
        fill("grey");
        rect(0, height - (height/10), width / 3, height/10, 0, width/40, 0, 0);
        fill(255, 242, 230);
        rect(width/120, height - (height/10.66), width/3 - (width/60), height/26.66, 0, width/40, width/40, 0);
        fill(0, 0, 0);
        textFont("Fantasy", height/36);
        text("FUEL", (width/9), height - (height/35));
        textFont("Fantasy", height/57);
        text("F", (width/3) - (width/50), height - (height/35));
        text("E", width/120, height - (height/35));
        textFont(displayFont, height/36);
        fill(31, 46, 46);
        if(!this.crashBool) {
            text("Dist: " + floor(str(this.dist)), width/60, height - (height/15));
        } else {
            if (this.errorCount < 50) {
                text("ERROR", width/60, height - (height/15));
            }
        }
        rect(width/300, height - (height/40), (width / 3) - (width/120), height/40, 8);
        if (this.fuel > 0) {
            if (this.fuel > 300) {
                fill(102, 255, 51);
            } else if (this.fuel > 100) {
                fill(255, 153, 0);
            } else {
                fill(204, 0, 0);
            }
            rect(width/120, height - (height/47), (width / 3) * (this.fuel / 1000) - (width/60), height/57, 5);
            //fill(200, 20, 20)
            //text(str(floor(this.fuel)), 10, height - 5);
        } else {
            this.errorCount++;
            if (this.errorCount > 100){
                this.errorCount = 0;
            }
            if (this.errorCount < 50) {
                fill(204, 0, 0);
                rect(width/120, height - (height/47), (width / 3)- (width/60), height/57, 5);
            }
        }
        if (this.crashBool) {
            push();
            textFont(displayFont, height/18);
            rectMode(CENTER);
            fill("grey");
            rect(width / 2, height / 2, width/2, height/12, 10);
            fill(255, 242, 230);
            rect(width / 2, height / 2, width/2.2, height/16, 10);
            fill(31, 46, 46);
            textAlign(CENTER);
            textStyle(BOLD);
            text("Dist: " + floor(str(hud.getDist())), width / 2, height / 2 + height/70);
            pop();
        }
    };

    this.getDist = function(){
      return this.dist;
    };
    this.crashed = function(){
        this.crashBool = true;
    }
}