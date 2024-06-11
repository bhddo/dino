var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver,restart
var jumpSound, checkPointSound, dieSound

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  //criar um sprite trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //criar um sprite ground (chão)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  //criando chao invisivel
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
 
  //criar os grupos de obstaculos e nuvens
  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  score = 0;
}
 

function draw() {
  //definir cor de fundo
  background(280);

  //exibindo a pontuação
  text("pontuação: " + score, 500, 50);

  console.log("isto è ", gameState)

  if(gameState === PLAY){
   score = score + Math.round(getFrameRate()/60)
    //mover o solo
    ground.velocityX = -(6 + 3*score/100);
    //autere a animação de trex
    trex.changeAnimation("running",trex_running);
   
    if(keyDown("space") && trex.y >=159) 
      {
        trex.velocityY = -12;
      }
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
  
 
  //pular quando a barra de espaço for pressionada
  if(keyDown("space") && trex.y >= 100) {
    trex.velocityY = -13;
  }
// colocar gravidade
  trex.velocityY = trex.velocityY + 0.8

  //gerar nuvens
  spawnClouds();

  //gerar obstaculos no chao
  spawnObstacles();

  if(obstaclesGroup.isTouching(trex)) {
    gameState = END;
  }
  }
  else if(gameState === END){
    console.log("hey")
    gameOver.visible = true;
    restart.visible = true;

  ground.velocityX = 0;
  trex.velocityY = 0;

  //mudar a animação do trex
  trex.changeAnimation("collided", trex_collided);

  //definir a vida util dos objetos dos jogos para que nunca sejam destruidos
  obstaclesGroup.setLifeTimeEach(-1);
  cloudsGroup.setLifeTimeEach(-1);
  
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
}

//impedir o dino de cair
  trex.collide(invisibleGround);

 

  drawSprites();
}

function spawnObstacles()
{
  if(frameCount % 60 === 0)
    {
      var obstacle = createSprite(400, 165, 10, 40);
      obstacle.velocityX = -6;

      //gerar obstaculos aleatorios
      var rand = Math.round(random(1,6));

      switch(rand){
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
        default: break;
      }

      //atribuir dimensão e tempo de vida ao obstaculo
      obstacle.scale = 0.5;
      obstacle.lifeTime = 300;

      //adicionar cada obstaculo ao grupo
      obstaclesGroup.add(obstacle);

    }
}

function spawnClouds()
{
  //escreva aqui o codigo para gerar nuvens
  if(frameCount % 60 === 0){
    cloud = createSprite(600, 100, 40,10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random())
    cloud.scale = 0.4;
  cloud.velocityX = -3;

  // ajuste a profundidade
  console.log(trex.depth);
  console.log(cloud.depth);
  }
}
