function Ambulance() {
    this.width = 100;
    this.height = 100;
    this.x = 230 + random(TRACK_SIZE);
    this.y = 0;
    this.policeImage = police;
    this.update = random(0.001);
    this.plusUpdateLimit = 230 + parseInt(random(TRACK_SIZE));
    this.minusUpdateLimit = 700 - parseInt(random(TRACK_SIZE));
    
    
    // Police Updation Algorithm
    this.updatePolice = function (operator) {
        var updatedX = eval(this.x + operator + SPEED + parseInt(score) * this.update);
        if (operator == '+') {
            this.x = (updatedX <= this.plusUpdateLimit) ? updatedX : this.x;
        }
        else {
            this.x = (updatedX >= this.minusUpdateLimit) ? updatedX : this.x;
        }
    }
    
    this.printPolice = function () {
        image(this.policeImage, this.x, this.y, this.width, this.height);
        this.y += SPEED + parseInt(score) * 0.01;
        //        this.x += SPEED + parseInt(score) * 0.01;
    }
    
    this.outOfFrame = function () {
        return (this.y + this.height / 2 >= height);
    }
}