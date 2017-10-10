function Rocket(spaceshipImage, crashImage){
    this.pos = createVector(width/2, height*.8)
    this.velX = 0;
    this.velY = 0;
    this.r = width/10
    this.c = color(155, 155, 55)
    this.fuel = 1000;
    this.velMultiplier = 0.3;
    this.fuelMulipilier = 0.5;
    this.frictionMultiplier = 0.99;
    this.spaceshipImage = spaceshipImage;
    this.crashImage = crashImage;
    this.imageCount = 0;
    this.imageCountFast = 0;
    this.crashedImageCount = 0;
    this.crashedImageCountFast = 0;
    this.edgeMultiplier = 0.6;
    this.crashed = false;

    this.show = function() {
        imageMode(CENTER);

        if(!crashed) {
            if (this.imageCountFast < 150) {
                this.imageCountFast++;
                this.imageCountFast++;
            } else {
                this.imageCountFast = 0;
            }

            if (this.imageCountFast < 50 && this.imageCountFast >= 0) {
                this.imageCount = 1;
            } else if (this.imageCountFast < 100 && this.imageCountFast >= 50){
                this.imageCount = 2
            } else {
                this.imageCount = 3;
            }

            switch (this.imageCount) {
                case 1:
                    image(this.spaceshipImage, this.pos.x, this.pos.y, this.r, this.r, 48, 0, 48, 48);
                    break;
                case 2:
                    image(this.spaceshipImage, this.pos.x, this.pos.y, this.r, this.r, 96, 0, 48, 48);
                    break;
                case 3:
                    image(this.spaceshipImage, this.pos.x, this.pos.y, this.r, this.r, 144, 0, 48, 48);
                    break;
            }
        } else {
            if (this.crashedImageCountFast < 560) {
                this.crashedImageCountFast += 10;
            }

            if (this.crashedImageCountFast < 50 && this.crashedImageCountFast >= 0) {
                this.crashedImageCount = 1;
            } else if (this.crashedImageCountFast < 100 && this.crashedImageCountFast >= 50){
                this.crashedImageCount = 2;
            } else if (this.crashedImageCountFast < 150 && this.crashedImageCountFast >= 100){
                this.crashedImageCount = 3;
            } else if (this.crashedImageCountFast < 200 && this.crashedImageCountFast >= 150){
                this.crashedImageCount = 4;
            } else if (this.crashedImageCountFast < 250 && this.crashedImageCountFast >= 200){
                this.crashedImageCount = 5;
            } else if (this.crashedImageCountFast < 300 && this.crashedImageCountFast >= 250){
                this.crashedImageCount = 6;
            } else if (this.crashedImageCountFast < 350 && this.crashedImageCountFast >= 300){
                this.crashedImageCount = 7;
            } else if (this.crashedImageCountFast < 400 && this.crashedImageCountFast >= 350){
                this.crashedImageCount = 8;
            } else if (this.crashedImageCountFast < 450 && this.crashedImageCountFast >= 400){
                this.crashedImageCount = 9;
            } else if (this.crashedImageCountFast < 500 && this.crashedImageCountFast >= 450){
                this.crashedImageCount = 10;
            }  else if (this.crashedImageCountFast < 550 && this.crashedImageCountFast >= 500){
                this.crashedImageCount = 11;
            } else {
                this.crashedImageCount = 0;
            }


            switch (this.crashedImageCount) {
                case 1:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 0, 0, 80, 80);
                    break;
                case 2:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 80, 0, 80, 80);
                    break;
                case 3:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 240, 0, 80, 80);
                    break;
                case 4:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 320, 0, 80, 80);
                    break;
                case 5:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 160, 0, 80, 80);
                    break;
                case 6:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 0, 80, 80, 80);
                    break;
                case 7:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 80, 80, 80, 80);
                    break;
                case 8:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 160, 80, 80, 80);
                    break;
                case 9:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 240, 80, 80, 80);
                    break;
                case 10:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 320, 0, 80, 80);
                    break;
                case 11:
                    image(this.crashImage, this.pos.x, this.pos.y, this.r, this.r, 0, 160, 80, 80);
                    break;
            }
        }
    };

    this.update = function() {
        this.pos.x += this.velX;
        this.pos.y += this.velY;
        this.velX = this.velX * this.frictionMultiplier;
        this.velY = this.velY * this.frictionMultiplier;
        if ((this.pos.x > width - 10 && this.velX > 0) || (this.pos.x < 20 && this.velX < 0)){
            this.velX *= this.edgeMultiplier;
        }
        if ((this.pos.y > height - 40 && this.velY > 0) || (this.pos.y < 50 && this.velY < 0)){
            this.velY *= this.edgeMultiplier;
        }
    };

    this.crashed = function(speed) {
        this.fuel = 0;
        this.c = color(155, 20, 20);
        this.frictionMultiplier = 0.97;
        this.velY += -speed;
        this.crashed = true;
    };

    this.getFuel = function() {
        return this.fuel;
    };
    
    this.getX = function() {
        return this.pos.x;
    };

    this.getY = function() {
        return this.pos.y;
    };

    this.up = function() {
        if (this.fuel > 0 && this.pos.y > 20){
            this.velY -= this.velMultiplier;
            this.fuel -= this.fuelMulipilier;
        }
    };

    this.down = function() {
        if (this.fuel > 0 && this.pos.y < height - 40){
            this.velY += this.velMultiplier;
            this.fuel -= this.fuelMulipilier;
        }
    };

    this.right = function() {
        if (this.fuel > 0 && this.pos.x < width - 40){
            this.velX += this.velMultiplier;
            this.fuel -= this.fuelMulipilier;
        }

    };

    this.left = function() {
        if (this.fuel > 0 && this.pos.x > 10){
            this.velX -= this.velMultiplier;
            this.fuel -= this.fuelMulipilier;
        }
    };

    this.stop = function() {
        this.velX = this.velX * 0.7;
        this.velY = this.velY * 0.7;
        if (this.fuel > 0){
            this.fuel -= this.fuelMulipilier;
        }
    };

    this.performRefuel = function() {
        if (this.fuel >= 800) {
            this.fuel = 1000;
        } else {
            this.fuel += 200;
        }
    };
}