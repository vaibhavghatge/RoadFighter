function Car(w,h) {
    this.width = w;
    this.height = h;
    this.x = 220 + random(TRACK_SIZE);
    this.y = 0;
	// to display different cars randomly
    switch (parseInt(random(5))) {
    case 0:
        this.carImage = carImgs[0];
        break;
    case 1:
        this.carImage = carImgs[1];
        break;
    case 2:
        this.carImage = carImgs[2];
        break;
	case 3:
        this.carImage = carImgs[3];
        break;
    case 4:
        this.carImage = carImgs[4];
        break;
    case 5:
        this.carImage = carImgs[5];
        break;
    }
	
    this.printCar = function () {
        image(this.carImage, this.x, this.y, this.width, this.height);
        this.y += Math.round(SPEED) + parseInt(score) * 0.01;
    }
	// to check if car is out of frame
    this.outOfFrame = function () {
        return (this.y + this.height / 2.5 >= height);
    }
}