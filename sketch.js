var stars=[];
var speed;
var spaceCraftImg;
var rocksImg;
var gameState;
var rocksGroup;
var score=0;
var gameOver;
var gameOverImg;
var restart;
var restartImg;
var sound;
var sound2;
var sound3;
var spaceCraft;
var backImg;
var back;
var invisible;
var powerup=0;
var invisibleImg;
var spaceStationImg;
var balloons;
var balloonsImg;

function preload(){
  spaceCraftImg=loadImage("rocket1.png");
  rocksImg=loadImage("rock.png");
  gameOverImg=loadImage("GameOver.png");
  restartImg=loadImage("restart.png");
  sound=loadSound("button-3.mp3");
  sound2=loadSound("button-2.mp3");
  sound3=loadSound("applause.mp3");
  backImg=loadAnimation("frame1.gif","frame2.gif","frame3.gif","frame4.gif","frame5.gif","frame6.gif","frame7.gif","frame8.gif","frame9.gif","frame10.gif","frame11.gif","frame12.gif","frame.gif");
  invisibleImg=loadImage("rocket.png");
  spaceStationImg=loadAnimation("spaceStation.png");
  balloonsImg=loadImage("balloons.png");
}

function setup() {
  createCanvas(700,500);
  back=createSprite(250,250,500,500);
  back.addAnimation("backgroundG",backImg);
  rocksGroup=new Group();
  spaceCraft=createSprite(200,400,20,20);
  spaceCraft.addImage(spaceCraftImg);
  gameOver=createSprite(250,220);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  restart=createSprite(250,300);
  restart.addImage(restartImg);
  restart.visible=false;
}

function draw() {
  background("black");
  gameFinish();
 if (keyCode===32) {
  gameState="Level1Play";
 }
 fill("red");
 text("Score "+score,600,250);
   if (gameState==="Level1Play") {
   score=score+Math.round(0.1);
   powerup=powerup+Math.round(0.1);
   console.log(score);
    console.log(powerup);
    spawnRocks();

    if(keyDown(LEFT_ARROW)){ 
      changePosition(-3,0);
      sound.play();
    } else if (keyDown(RIGHT_ARROW)) {
      changePosition(5,0);
       sound.play();
    } 
    spawnPowerUp();
    if (spaceCraft.x>500 || spaceCraft.x<0 || spaceCraft.y>500 || spaceCraft.y<0) {
      gameState="Level1End";
    }
    if (score>120) {
      rocksGroup.setVelocityYEach(8);
    }
   spaceCraft.setCollider("rectangle",0,0,87,103);
   rocksGroup.setColliderEach("rectangle",0,0,107,83);
  if (score>100 && mousePressedOver(invisible)) {
      spaceCraft.x=700; 
      if (powerup===115) {
        spaceCraft.x=200;   
      }  
}

 if (rocksGroup.isTouching(spaceCraft)) {
   gameState="Level1End";
   sound2.play();
  } 
 
 }
 if (gameState==="Level1End") {
  rocksGroup.setVelocityYEach(0);
  rocksGroup.setLifetimeEach(1);
  gameOver.visible=true;
  restart.visible=true;
  if (mousePressedOver(restart)) {
    reset();
  }
}
  
  drawSprites();
}

function spawnRocks() {
   if (frameCount%55===0) {
   var rocks=createSprite(5,10);
   rocks.x=random(-100,400);
   rocks.velocityY=(4);
   rocks.addImage(rocksImg);
   rocksGroup.add(rocks);
   rocks.lifetime=120;
   rocks.debug=true;
   score=score+1;
   powerup=powerup+1;
  }
}

function changePosition(x,y){
    spaceCraft.x = spaceCraft.x + x; 
    spaceCraft.y = spaceCraft.y + y;
   
}

function reset(){
  console.log("Hello");
    gameState = "Level1Play";
    gameOver.visible = false;
    restart.visible = false;
    rocksGroup.destroyEach();
    score = 0;
    powerup=0;
}

function spawnPowerUp(){
   if (frameCount%100===0) {
      invisible =createSprite(70,120,20,20);
      invisible.addImage(invisibleImg);
   }
}

function gameFinish(){
  if(score>150){
    rocksGroup.destroyEach();
    invisible.visible=false;
    spaceCraft.x=250;
    if (frameCount%40===0) {
      balloons=createSprite(random(100,400),250);
      balloons.addImage(balloonsImg);
      balloons.velocityY=-3;
      balloons.lifetime=90;
      sound3.play();
    }
   var spaceStation =createSprite(250,250,500,500);
   spaceStation.addAnimation("spaceStation",spaceStationImg); 
   score=150;
  }
}