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
var spaceCraft;
var backImg;

function preload(){
  spaceCraftImg=loadImage("rocket1.png");
  rocksImg=loadImage("rock.png");
  gameOverImg=loadImage("GameOver.png");
  restartImg=loadImage("restart.png");
  sound=loadSound("button-3.mp3");
  sound2=loadSound("button-2.mp3");
  backImg=createImg("giphy1.gif");
}

function setup() {
  createCanvas(500,500);
  //for (var i = 0; i < 800; i++) {
  //  stars[i] = new Star();
 // }
  rocksGroup=new Group();
  spaceCraft=createSprite(20,200,20,20);
  spaceCraft.addImage(spaceCraftImg);
  gameOver=createSprite(20,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  restart=createSprite(20,10);
  //restart.addImage(restartImg);
  restart.visible=false;
}

function draw() {
  //text("Hi",20,20);
 if (keyCode===32) {
  gameState="Level1Play";
 }
  background(0);
 /* speed = map(150, 0, width, 0, 150);
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
   }*/
     backImg.position(0,50);
     spaceCraft.depth=backImg.depth;
     spaceCraft.depth=spaceCraft.depth+1;
   if (gameState==="Level1Play") {
    text("Score "+score,500,50);
    score = score + Math.round(getFrameRate()/60);
    spawnRocks();

    if(keyDown(LEFT_ARROW)){ 
      changePosition(-3,0);
      sound.play();
    } else if (keyDown(RIGHT_ARROW)) {
      changePosition(5,0);
      sound.play();
    }
   spaceCraft.setCollider("rectangle",0,0,117,133);
 if (rocksGroup.isTouching(spaceCraft)) {
   gameState="Level1End";
   sound2.play();
  } 
 
 }
  else if (gameState==="Level1End") {
  rocksGroup.setVelocityYEach(0);
  rocksGroup.setLifetimeEach(-1);
  gameOver.visible=true;
  restart.visible=true;
}
  
  drawSprites();
}

function spawnRocks() {
   if (frameCount%40===0) {
   var rocks=createSprite(5,10);
   rocks.x=random(-100,400);
   rocks.velocityY=(4);
   rocks.addImage(rocksImg);
   rocksGroup.add(rocks);
   rocks.lifetime=150;
   rocks.debug=true;
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
}

//function mouseClicked(restart){
 //reset();
//}