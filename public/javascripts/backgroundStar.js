function BackgroundStar() {
    this.pos = createVector(random(0, width), random(-200, height));
    this.speedMultiplier = 0.0001;
    this.speed = 0.08;
    this.color = color(255, random(200, 255), random(0, 255));

    this.show = function() {
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 2);
    }

    this.update = function() {
        this.pos.y += this.speed;
        this.speed += this.speedMultiplier;

        if(this.pos.y > height + 20){
            this.pos.x = random(0, width);
            this.pos.y = random(-200,-50);
        }
    }

    this.crash = function() {
        this.speedMultiplier = 0;
        this.speed = 0;
    }
}