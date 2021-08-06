var bg,bgImg;
var tom,tomImg,log,logImg,can,canImg,mushroom,mushroomImg,plant,plantImg,coin,coinImg,coinsGroup,obstaclesGroup;
var score = 0;
var PLAY=1;
var END =0; 
var gameState = PLAY ;
var gameOver,gameOverImg;
var restart,restartImg;
var scoreSound,carSound,gameOverSound;

function preload(){
bgImg = loadImage("sprites/Road.png");
tomImg = loadImage("sprites/tom2.png");
logImg = loadImage("sprites/log3.png");
canImg = loadImage("sprites/can2.png");
mushroomImg = loadImage("sprites/mushroom2.png");
plantImg = loadImage("sprites/plant2.png");
coinImg = loadImage("sprites/coin3.png.png");
gameOverImg = loadImage("sprites/gameOver2.png");
restartImg = loadImage("sprites/restart3.png");

scoreSound = loadSound("sprites/score.mp3");
carSound = loadSound("sprites/car.mp3.mp3");
gameOverSound = loadSound("sprites/gameover.mp3");

}

function setup() {
  createCanvas(1200,600);

 bg = createSprite(600,400,1400,800);
 bg.addImage(bgImg);

 tom = createSprite(600,450,20,20);
 tom.addImage(tomImg);
 tom.debug= false;
 tom.setCollider("rectangle",0,0,100,100);
 
obstaclesGroup = createGroup();

coinsGroup = createGroup();

gameOver = createSprite(600,250,10,10);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;

restart = createSprite(600,400,10,10);
restart.addImage(restartImg);
restart.scale = 0.3;

gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(255,255,255);
 
  if(gameState === PLAY){
  bg.velocityY = 10;
  carSound.play();
  //console.log(bg.y);

  if(bg.y>600){
    bg.y = height/2

  }

  if(keyDown(LEFT_ARROW)){
    tom.x -= 7;
  
  }

  if(keyDown(RIGHT_ARROW)){
    tom.x += 7;
  
  }

  if(tom.isTouching(coinsGroup)){
   
    coinsGroup.destroyEach();
     score=score+10; 
     scoreSound.play(); 
    } 
     

  spawnObstacles();
  spawnCoins();
  if(tom.isTouching(obstaclesGroup)){
    gameState = END;
    
  }
}

else if(gameState === END){
  gameOverSound.play();
  carSound.stop();
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  bg.velocityY = 0;
 
  gameOver.visible = true;
  restart.visible = true;
  
  if(mousePressedOver(restart)){
    reset();
  }
}
  drawSprites();

  textSize(20);
  fill (600);
  text("Score: "+ score,900,100);
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(Math.round(random(10,990)),0,10,40);
   
   obstacle.velocityY = +(8+ score/100 );
   console.log(obstacle.y);
   obstacle.debug=false;
   obstacle.setCollider("rectangle",0,0,200,200);
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(logImg);
              break;
      case 2: obstacle.addImage(canImg);
              break;
      case 3: obstacle.addImage(plantImg);
              break;
      case 4: obstacle.addImage(mushroomImg);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 800;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
 }
}

function spawnCoins() {
  //write code here to spawn the coinss
  if (frameCount % 80 === 0) {
   coin = createSprite(Math.round(random(80,1000)),0,10,10);
    //coin.y = Math.round(random(80,220));
    coin.addImage(coinImg);
    coin.scale = 0.5;
    coin.velocityY = +(9+ score/100 );
    
     //assign lifetime to the variable
     coin.lifetime = 800;
    
    //add each coin to the group
    coinsGroup.add(coin);
  }
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
}




