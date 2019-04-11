function Player(playerImage,w,h,images) {
    this.playerImage = playerImage;
    this.width = w;
    this.height = h;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height;
    this.UPDAT_FACTOR = 25;
	this.imgs=images;
	
	
	this.resetPosition=function(){
		this.x = 200;
	}
	
	this.setPlayerImage=function(plimg){
		this.playerImage =plimg;
	}
	
    this.printPlayer = function () {
        image(this.playerImage, this.x, this.y, this.width, this.height);
    }
	// car control functions
    this.top = function () {
		if(SPEED<=8){
			SPEED=SPEED+1;
		}
        
    }
    this.bottom = function () {
		
       if(SPEED>=2){
			SPEED=SPEED-1;
		}
    }
    this.left = function () {
        if (this.x > 190) {
            this.x += -this.UPDAT_FACTOR;
        }
    }
    this.right = function () {
        if (this.x < 710) {
            this.x += this.UPDAT_FACTOR;
        }
    }
	//to check for collision based on car dimensions
    this.collide = function (car) {
        isCollide = false;
        if ((this.y - this.height / 2 <= car.y + car.height / 2.5) && (this.y + this.height / 2 >= car.y - car.height / 2.5)) {
            if ((this.x - this.width / 4.5 <= car.x + car.width / 4) && (this.x + this.width / 4.5 >= car.x - car.width / 4)) {
                isCollide = true;
            }
        }
        return isCollide;
    }
}