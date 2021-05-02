var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
   
    spawnDoors();

    if(tower.y > 400){
      
      tower.y = 300;
      
    }
    
    
    if(keyDown("RIGHT_ARROW")){
      ghost .x = ghost.x + 3;
    }
    
     if(keyDown("LEFT_ARROW")){
      ghost .x = ghost.x - 3;
    }
    
    if(keyDown("space")){
      ghost .velocityY = -10  ;
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600) {
      gameState = "end";
      ghost.destroy;
      
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250)
    
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
       var door = createSprite(200, -50);
       door.addImage(doorImg);
       door.velocityY = 1;
    
       
    var climber = createSprite(200, 10);
       climber.addImage(climberImg);
       climber.velocityY = 1;
    
    invisibleBlock = createSprite(200,10) 
       invisibleBlock.width = climber.width;
       invisibleBlock.height = 2; 
       invisibleBlock.velocityY = 1; 
    
       door.x = Math.round(random(120,400))
    
    climber.x = door.x ;
    invisibleBlock.x = door.x;
    
    ghost.depth = door.depth;
    ghost.depth += 1 
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
     doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}

