var bananaimage,obstacleimage,backimage,back
var ground,groundimage;
var player_running,monkey,banana,bananagroup
var obstacle,obstaclegroup;
var score=0;

function preload(){
  bananaimage=loadImage("Banana.png");
  obstacleimage=loadImage("stone.png");
  backimage=loadImage("jungle.jpg");
  
  groundimage=loadImage("ground.jpg");
  
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}


function setup() {
  createCanvas(600,300);
  
  back=createSprite(300,250,400,20);
  back.addImage("back",backimage);
  back.scale=1.5;
  back.x = back.width /2;
  back.velocityX = -2;
  
  ground=createSprite(300,295,800,20)
  ground.scale=1;
  ground.velocityX=-2;
  ground.x = ground.width /2;
  
  
  monkey = createSprite(35,295,20,50);
  monkey.addAnimation("running", player_running);
  monkey.scale = 0.1;
  
  bananagroup = new Group();
  obstaclegroup = new Group();
  
  score=0;
  
}


function draw(){
 background(180);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  ground.visible=false;
  
  if (bananagroup.isTouching(monkey)){
    score=score+1
  switch(score){
    case 10:monkey.scale=0.12;
          break;
    case 20:monkey.scale=0.14;
          break;
    case 30:monkey.scale=0.16;
          break;
    case 40:monkey.scale=0.18;
          break;
    default:break;
  }
    bananagroup.destroyEach();
  }
  
  if (ground.x<0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
  
  if (back.x<0){
    back.x = back.width /2;
  }
  
  if(keyDown("space")&& monkey.y>=131) {
      monkey.velocityY = -12;
    }
  
  if (obstaclegroup.isTouching(monkey)){
    monkey.scale=0.1;
  }

    monkey.velocityY = monkey.velocityY + 0.8
  
  food();
  obstacles();
  
  drawSprites();
  text("Score: "+ score, 500,50);
}

function food (){
  if (frameCount % 80 === 0) {
    var banana=createSprite(600,random(20,200),20,20);
    banana.addImage(bananaimage);
    banana.scale=0.05;
    banana.velocityX=-8;
    banana.lifetime=78;
    bananagroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 110;
    obstaclegroup.add(obstacle);
  }
}