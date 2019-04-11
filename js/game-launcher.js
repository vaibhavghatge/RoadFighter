//var themeframe;
var song;
var player;
var road;
var road1;
var road2;
var road3;
var playerImage;
var playerImage2;
var playerImage3;
var traffic = [];

var surObjects = [];
var ambulance;
var AmbulanceCars =[];
var updateOperator = '+';   //Updation Logic II
var xi=10;
var blid;
var rid;
var blastdata;
var carsdata;
var playerdata;
var lives;
var carWidth;
var carHeight;

var screenid;




function preload(){
    screenid=1;
	rid=0;
	
	
    ambulance = loadImage('assets/am1.png');
	ambulance1 = loadImage('assets/am2.png');
	ambulance2 = loadImage('assets/am3.png');

	// to load data from json file
	blastdata=loadJSON('data/blast.json');
	carsdata=loadJSON('data/cars.json');
	playerdata=loadJSON('data/player.json');
	
	blid=0;
	
    
    ground = loadImage('assets/ground.png');
	
    surs[0] = loadImage('assets/bush.png');
    surs[1] = loadImage('assets/rockpile.png');
	
    

    document.getElementById('quit').addEventListener('click',QuitGame);
    document.getElementById('play').addEventListener('click',startGame);
	  document.getElementById('mainScreenBtn').style.display="none";
	  document.getElementById('mainScreenBtn').addEventListener('click',showMenu);
	  
	
}

function setup(){
    
    var canvas=createCanvas(1000,500);
	canvas.parent('gameplay');
	// setting images from blast json file 
	blastImgs[0]=loadImage(blastdata.img1);
	blastImgs[1]=loadImage(blastdata.img2);
	blastImgs[2]=loadImage(blastdata.img3);
	blastImgs[3]=loadImage(blastdata.img4);
	blastImgs[4]=loadImage(blastdata.img5);
	blastImgs[5]=loadImage(blastdata.img6);
	blastImgs[6]=loadImage(blastdata.img7);
	blastImgs[7]=loadImage(blastdata.img8);
	blastImgs[8]=loadImage(blastdata.img9);
	blastImgs[9]=loadImage(blastdata.img10);
	
	
	// setting images from cars json file
	carImgs[0] = loadImage(carsdata.img1);
    carImgs[1] = loadImage(carsdata.img2);
    carImgs[2]= loadImage(carsdata.img3);
	carImgs[3]= loadImage(carsdata.img4);
    carImgs[4]= loadImage(carsdata.img5);
    carImgs[5]= loadImage(carsdata.img6);
	carWidth=carsdata.width;
	carHeight=carsdata.height;
	
	// setting player objects data
	playerImage = loadImage(playerdata.img1);
    playerImage2 = loadImage(playerdata.img2);
	playerImage3= loadImage(playerdata.img3);
	player = new Player(playerImage,playerdata.width,playerdata.height);
	
	
	// setting road images
	road1 = loadImage('assets/road3.png');
	road2 = loadImage('assets/road2.png');
	road3 = loadImage('assets/road1.png');
	road=road1;

    
    song = loadSound('assets/music/game_music_loop.mp3',function(){
        song.loop();
    });
    lives=2;
  
}

function draw(){
	
	if(screenid==2){
		drawPlayScreen();
	}
	

    
}

function drawPlayScreen(){
	animatePlayer()
	animateRoad();
   	printLives();
	printSpeed();
    generateSurrounds();
    generateAmbulanceCars();
    printAmbulanceCars();
    player.printPlayer();
    printSurrounds();
    generateTraffic();
    printTraffic();
    showScore();
}

function printSpeed(){
	fill('white');
    textSize(20);
	
    text('Speed : '+SPEED*50, 40, 200);
	fill('red')
	rect(40, 220, SPEED*10, 20);
	console.log(SPEED);
	
}
function printLives(){
	fill(204, 101, 192, 127);
	stroke(127, 63, 120);
	var x=50;
	fill('white');
    textSize(20);
    text('Lives : '+lives, 40, 100);
	fill('pink');
	for(i=0;i<lives;i++){
		ellipse(x, 120, 20, 20);
		x=x+30;
	}
}
/**
To animate the player by changing images
*/

function animatePlayer(){
		if(player.playerImage==playerImage){
		player.setPlayerImage(playerImage2)
	}else if(player.playerImage==playerImage2){
		player.setPlayerImage(playerImage3)
	}else{
		player.setPlayerImage(playerImage)
	}
	
}

function animateRoad(){
	rid++;
	if(SPEED<2){
		if(rid%5==0){
		if(road==road1){
			road=road3;
		}else if(road==road3){
			road=road2;
		}else{
			road=road1;
		}
	}
	}else if(SPEED==2 || SPEED == 3){
	
		if(rid%3==0){
			if(road==road1){
				road=road3;
			}else if(road==road3){
				road=road2;
			}else{
				road=road1;
			}
		}
	}
	else if(SPEED==4 || SPEED == 5){
	
		if(rid%2==0){
			if(road==road1){
				road=road3;
			}else if(road==road3){
				road=road2;
			}else{
				road=road1;
			}
		}
	}else{
			if(road==road1){
				road=road3;
			}else if(road==road3){
				road=road2;
			}else{
				road=road1;
			}
	}
	 background(road);

	
}


/*
To display the score
*/

function showScore(){
    
    
    fill('white');
    textSize(30);
    text('SCORE : '+parseInt(score), 40, 40);
   
}
/*
To generate and show surrounding objects
*/
function generateSurrounds(){

    if(frameCount%100 == 0){
        surObjects.push(new Surrounding());
    }
}

function printSurrounds(){
    
    for(var i=0; i<surObjects.length ;i++){
        
        
        if(surObjects[i].outOfFrame()){
            surObjects.slice(i,1);
            
        }
        
        surObjects[i].printObject();
    }
    
  
}


function generateTraffic(){
    if((frameCount%130 == 0) && (frameCount%310 != 0)){
		  traffic.push(new Car(carWidth,carHeight));
	}
}

function printTraffic(){
    
    
    for(var i=0; i<traffic.length ;i++){
        
        // to remove when objects goes out of frame
        if(traffic[i].outOfFrame()){
            traffic.slice(i,1);
            
        }
        //to reduce players life when hit
        if(player.collide(traffic[i])){
			
			lives--;
			if(lives<=0){
				gameOver();
			}else{
			player.resetPosition();
			}
			
           
           
        }
        else{
			//to increase score
            score += 0.01;
        }
        
        traffic[i].printCar();
    }
}

function generateAmbulanceCars(){
    // to create ambulance every 300 frame count
    if(frameCount%300 == 0){
        AmbulanceCars.push(new Ambulance());
    }
}

function printAmbulanceCars(){
    
    for(var i=0; i<AmbulanceCars.length ;i++){
        
        
        if(AmbulanceCars[i].outOfFrame()){
            AmbulanceCars.slice(i,1);
            
        }
        
        if(player.collide(AmbulanceCars[i])){
            
           
			lives--;
			if(lives<=0){
            gameOver();
			}else{
			player.resetPosition();
			}
			
			
             
        }
        
        else{
            score += 0.01;
        }
        
        AmbulanceCars[i].printAmbulance();
        
   
        AmbulanceCars[i].updateAmbulance(updateOperator);
    }
}
// to get the keypress
function keyPressed(){
	// key code for buttons press based on javascript
    const LEFT = 37;
    const TOP = 38;
    const RIGHT = 39;
    const BOTTOM = 40;
	const A = 65;
    const D = 68;
    const S = 83;
    const W = 87;
    
    if(keyCode == LEFT || keyCode ==A ){
        player.left();
        updateOperator = '-';
    }
    if(keyCode == RIGHT || keyCode ==D){
        player.right();
        updateOperator = '+';
    }
    
    if(keyCode == TOP || keyCode == W){
		
        player.top();
       
    }
    
    if(keyCode == BOTTOM || keyCode ==S) {
        player.bottom();
       
    }
	
    console.log('key code'+ keyCode);
    
}

// to load the game over animation
function gameOver(){
  //  blastImgs[0]
	
	
	
		draw= function(){
			
			
			if(blid==0){
				song.stop();
				 song = loadSound('assets/music/car_crash.mp3',function(){
					song.play();
				});
				background(road);
				image(blastImgs[0],player.x+20, player.y+10);
				
			}else if(blid==10){
				background(road);
				image(blastImgs[1],player.x+20, player.y+10);
			}
			else if(blid==20){
				background(road);
				image(blastImgs[2],player.x+20, player.y+10);
				
			}else if(blid==30){
				background(road);
				image(blastImgs[3],player.x+20, player.y+10);
				
			}else if(blid==40){
				background(road);
				image(blastImgs[5],player.x+20, player.y+10);
			}else if(blid==50){
				background(road);
				image(blastImgs[5],player.x+20, player.y+10);
			}else if(blid==60){
				
				background(road);
				image(blastImgs[6],player.x+20, player.y+10);
			}else if(blid==70){
				background(road);
				image(blastImgs[7],player.x+20, player.y+10);
			}else if(blid==80){
				background(road);
				image(blastImgs[8],player.x+20, player.y+10);
			}
			else if(blid==90){
				background(road);
				image(blastImgs[9],player.x+20, player.y+10);
			}else if (blid>90){
				screenid=3;
				
			}
			if(screenid==3){
				draw= function(){
				
				background('red');
				fill('white');
				textSize(30);
				text('GAME OVER!! \nScore:'+parseInt(score)+'', 380, 200);
				
				}
				
			}
		
			
			
					blid++; 
			}
		
		
}


//to start the game
function startGame(){
	
	var x=document.getElementById('mainScreen');
	x.style.display="none";
	document.getElementById('mainScreenBtn').style.display="block";
    screenid=2;
	

	
	
}
// to show the menu screen
function showMenu(){
	location.reload(); 
	
	
}
// to quit the game
function QuitGame(){
if(confirm('Do you want to close the game? ')){
    close();
}
}
