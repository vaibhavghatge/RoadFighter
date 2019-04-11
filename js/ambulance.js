function Ambulance() {
    this.width = 100;
    this.height = 100;
    this.x = 230 + random(TRACK_SIZE);
    this.y = 0;
    this.ambulanceImage = ambulance;
    this.update = random(0.001);
    this.plusUpdateLimit = 230 + parseInt(random(TRACK_SIZE));
    this.minusUpdateLimit = 700 - parseInt(random(TRACK_SIZE));
    
    
	
	
    // Ambulance Updation logic
    this.updateAmbulance = function (operator) {
        var updatedX = eval(this.x + operator + Math.round(SPEED) + parseInt(score) * this.update);
        if (operator == '+') {
            this.x = (updatedX <= this.plusUpdateLimit) ? updatedX : this.x;
        }
        else {
            this.x = (updatedX >= this.minusUpdateLimit) ? updatedX : this.x;
        }
    }
    
    this.printAmbulance = function () {
		if(this.ambulanceImage==ambulance){
			this.ambulanceImage=ambulance1;
		}else if(this.ambulanceImage==ambulance1){
			this.ambulanceImage=ambulance2;
		}else{
			this.ambulanceImage=ambulance;
		}
		
        image(this.ambulanceImage, this.x, this.y, this.width, this.height);
        this.y += SPEED + parseInt(score) * 0.01;
        
    }
    // to check if car is out of frame
    this.outOfFrame = function () {
        return (this.y + this.height / 2 >= height);
    }
}