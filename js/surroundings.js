function Surrounding(){
    
    this.width = 100;
    this.height = 100;
    this.y = -10;
    this.x = random(100);

    //random surrounding objects
    if(parseInt(random(5)) < 2){
        this.x += 10;
    }
    else{
        this.x += 800;
    }
    
    if(parseInt(random(2)) == 1){
        this.objImage =  surs[0];
    }
       
    else{                
        this.objImage =  surs[1];  
    }
    
    this.printObject = function(){
        
        image(this.objImage, this.x, this.y, this.width, this.height);
        this.y += SPEED  + parseInt(score)*0.01;
    }
    // to check if object is out of frame
    this.outOfFrame = function(){
        
        return ( this.y+this.height/2.5 >= height );
            
    }
}