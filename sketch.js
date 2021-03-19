var path,mainCyclist,player1;
var pathImg,mainRacerImg1,mainRacerImg2,yellowCyclistImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  gameOverImg = loadImage("gameOver.png");
  resetImg = loadImage("download.png")
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  yellowCyclistImg =loadAnimation("yellow.png","yellow1.png");
  pinkCyclistImg = loadAnimation("pink.png","pink1.png");
  redCyclistImg = loadAnimation("red.png","red1.png");
  
  yellowfallingImg = loadImage("yellowfalling.png");
  pinkfallingImg = loadImage("pinkfalling.png");
  redfallingImg = loadImage("redfalling.png");
  
  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  
  bellSound = loadSound("sound/bell.mp3")
}

function setup(){
  
  createCanvas(700,300);

  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.scale = 0.4
  path.velocityX = -5;

  gameOver = createSprite(350,110,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.8;
  
  restart = createSprite(350,180,10,10);
  restart.addImage(resetImg);
  restart.scale = 0.2
  
  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("racer",mainRacerImg1);
  mainCyclist.scale=0.07;
//mainCyclist.debug = true
  mainCyclist.setCollider("circle",0,0,650);
  
  yellowCG = createGroup();
  pinkCG = createGroup();
  redCG = createGroup();
  
  obstacle1G = createGroup();
  obstacle2G = createGroup();
  obstacle3G = createGroup();
  obstacle4G = createGroup();
}

function draw() {
  background(0);

  
  textSize(20);
  fill(255);
  text("Distance: "+ distance,550,30);
  
  if(gameState===PLAY){
   distance = distance + Math.round(getFrameRate()/50);
    
   gameOver.visible = false;
   restart.visible = false;
    
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }

  path.velocityX = -(6+2*distance/500)
  if(keyWentDown("space")){
     bellSound.play();
  }
  
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 100 == 0){
    if(select_oppPlayer == 1){
      yellowCyclist();
    }else if (select_oppPlayer == 2 ){
      redCyclist();
    }else if (select_oppPlayer == 3){
      pinkCyclist();
    }
  }
    
    var select_oppObstacle = Math.round(random(1,4));
  
  if (World.frameCount % 200 == 0){
    if(select_oppObstacle == 1){
      obstacles1();
    }else if (select_oppObstacle == 2 ){
      obstacles2();
    }else if (select_oppObstacle == 3){
      obstacles3();
    }else if (select_oppObstacle == 4){
      obstacles4();
    }
  }
    
  if(mainCyclist.isTouching(pinkCG)){
    gameState = END;
    mainCyclist.addAnimation("racer",mainRacerImg2);
    player3.addAnimation("opponentpink",pinkfallingImg);
    player3.velocityX = 0;
  
    redCG.destroyEach();
    yellowCG.destroyEach();

    obstacle1G.destroyEach();
    obstacle2G.destroyEach();
    obstacle3G.destroyEach();
    obstacle4G.destroyEach();
  }
    
  if(mainCyclist.isTouching(redCG)){
    gameState = END;
    mainCyclist.addAnimation("racer",mainRacerImg2);
    player2.addAnimation("opponentred",redfallingImg);
    player2.velocityX = 0;
    
    pinkCG.destroyEach();
    yellowCG.destroyEach();

    obstacle1G.destroyEach();
    obstacle2G.destroyEach();
    obstacle3G.destroyEach();
    obstacle4G.destroyEach();
  }
    
  if(mainCyclist.isTouching(yellowCG)){
    gameState = END;
    mainCyclist.addAnimation("racer",mainRacerImg2);
    player1.addAnimation("opponentYellow",yellowfallingImg);
    player1.velocityX = 0;
    pinkCG.destroyEach();
    redCG.destroyEach();

    obstacle1G.destroyEach();
    obstacle2G.destroyEach();
    obstacle3G.destroyEach();
    obstacle4G.destroyEach();
  }
   
  if(mainCyclist.isTouching(obstacle1G)){
    gameState = END;
    mainCyclist.addAnimation("racer",mainRacerImg2);
    
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();

    obstacle2G.destroyEach();
    obstacle3G.destroyEach();
    obstacle4G.destroyEach();
  }
  
  if(mainCyclist.isTouching(obstacle2G)){
    gameState = END;
    mainCyclist.addAnimation("racer",mainRacerImg2);
    
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();

    obstacle1G.destroyEach();
    obstacle3G.destroyEach();
    obstacle4G.destroyEach();
  }
  
  if(mainCyclist.isTouching(obstacle3G)){
    gameState = END;
    mainCyclist.addAnimation("racer",mainRacerImg2);
    
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();

    obstacle1G.destroyEach();
    obstacle2G.destroyEach();
    obstacle4G.destroyEach();
  }
    
  if(mainCyclist.isTouching(obstacle4G)){
    gameState = END;
    mainCyclist.addAnimation("racer",mainRacerImg2);
    
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();

    obstacle1G.destroyEach();
    obstacle2G.destroyEach();
    obstacle3G.destroyEach();
  }
    
 }else{
   if(gameState === END){
     path.velocityX=0;
     gameOver.visible = true;
     restart.visible = true;
     
     obstacle1G.setVelocityXEach(0);
     obstacle2G.setVelocityXEach(0);
     obstacle3G.setVelocityXEach(0);
     obstacle4G.setVelocityXEach(0);
     
     pinkCG.setVelocityXEach(0);
     redCG.setVelocityXEach(0);
     yellowCG.setVelocityXEach(0);
     
     if(mousePressedOver(restart)){
       reset();
     }
   }
 }
 drawSprites();
}

function yellowCyclist(){
  player1=createSprite(600,Math.round(random(50,250),10,10));
  player1.addAnimation("opponentYellow",yellowCyclistImg);
  player1.velocityX=-(6+2*distance/300);
  player1.scale =0.07;
  player1.setLifetime=120;
  yellowCG.add(player1);
}

function redCyclist(){
  player2=createSprite(600,Math.round(random(50,250),10,10));
  player2.addAnimation("opponentred",redCyclistImg);
  player2.velocityX=-(6+2*distance/300);
  player2.scale =0.07;
  player2.setLifetime=120;
  redCG.add(player2);
}

function pinkCyclist(){
  player3=createSprite(600,Math.round(random(50,250),10,10));
  player3.addAnimation("opponentpink",pinkCyclistImg);
  player3.velocityX=-(6+2*distance/300);
  player3.scale =0.07;
  player3.setLifetime=120;
  pinkCG.add(player3);
}

function obstacles1(){
  obstacle1=createSprite(800,Math.round(random(50,250),10,10));
  obstacle1.addImage(obstacle1Img);
  obstacle1.velocityX=-(6+2*distance/300);
  obstacle1.scale =0.07;
  obstacle1.setLifeTime=120;
  obstacle1G.add(obstacle1);
}

function obstacles2(){
  obstacle2=createSprite(800,Math.round(random(50,250),10,10));
  obstacle2.addImage(obstacle2Img);
  obstacle2.velocityX=-(6+2*distance/300);
  obstacle2.scale =0.07;
  obstacle2.setLifeTime=120;
  obstacle2G.add(obstacle2);
}

function obstacles3(){
  obstacle3=createSprite(800,Math.round(random(50,250),10,10));
  obstacle3.addImage(obstacle3Img);
  obstacle3.velocityX=-(6+2*distance/300);
  obstacle3.scale =0.07;
  obstacle3.setLifeTime=120;
  obstacle3G.add(obstacle3);
}

function obstacles4(){
  obstacle4=createSprite(800,Math.round(random(50,250),10,10));
  obstacle4.addImage(obstacle4Img);
  obstacle4.velocityX=-(6+2*distance/300);
  obstacle4.scale =0.2;
  obstacle4.setLifeTime=120;
  obstacle4G.add(obstacle4);
}

function reset(){
  gameState = PLAY;
  
  mainCyclist.addAnimation("racer",mainRacerImg1);
  
  gameOver.visible = false;
  restart.visible = false;
  
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  
  obstacle1G.destroyEach();
  obstacle2G.destroyEach();
  obstacle3G.destroyEach();
  obstacle4G.destroyEach();
  
  distance = 0;
}