var PLAY = 1;
var END = 0;
gameState = PLAY;
var monkey, monkey_running;
var ground, invisibleGround;
var banana, bananaImg, bananaGroup;
var obstacle, obstacleImg, obstacleGroup;
var foodGroup;
var score;
var survivalTime = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImg = loadImage("banana.png");

  obstacleImg = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  // ground.x = ground.width/2;
  console.log(ground.x);

  invisibleGround = createSprite(400, 355, 900, 10);
  invisibleGround.visible = false;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("white")
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());       text("Survival Time: " + survivalTime, 100, 50);

  if (ground.x < 150) {
    ground.x = ground.width / 2;
  }

  //Jump when the space key is pressed
  if (keyDown('space') && monkey.y >= 100) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.7
  //Stop monkey from falling down
  monkey.collide(invisibleGround);

  food();
  spawnObstacles();
  drawSprites();
}

function food() {
  if (frameCount % 100 === 0) {
    banana = createSprite(600, 150, 30, 30);
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -2;
    banana.addImage(bananaImg);
    banana.scale = 0.10;
    banana.lifetime = 350;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 328, 30, 30);
    obstacle.velocityX = -2;
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.10;
    obstacle.lifetime = 350;
    obstacleGroup.add(obstacle);
  }
}