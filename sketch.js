const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;

var backgroundIMG;
var returnButtonIMG;
var lockLevelIMG;
var headingIMG;
var buttonIMG;
var levelButtonIMG;
var roofSpikeImage;
var knightWalkingANM;

var Background;
var returnButton;
var introButton;
var playButton;
var creditButton;
var lavaFireball;
var witchFireball;
var level1, level2, level3, level4, level5;

var gamestate = 'level5';

//1. animation of knight not working properly 
//3. changing the x and y of knight according to the level
//4. how can I use arrays in the code
//5. not able to jump at some points like the start of level5,4
//7. how do I insert audios at different times without lag
//8. how to make level unaccessable if the previous 1 is not done



function preload() {
  backgroundIMG = loadImage('images/backgroundImage.jpg');
  buttonIMG = loadImage('images/buttonImage.png');
  downFacingSpikeIMG = loadImage('images/spikes/downFacingSpikeImage.png');
  endingPortalIMG = loadImage('images/endingPortalImage.png');
  groundIMG = loadImage('images/groundImage.png');
  groundStripIMG=loadImage("images/groundStripsImage.png")
  headingIMG = loadImage('images/headingImage.png');
  lavaFireballIMG = loadImage('images/lavaFireballImage.png');
  lavaIMG = loadImage('images/lavaImage.png');
  leftFacingSpikeIMG = loadImage('images/spikes/leftFacingSpikeImage.png');
  levelButton1IMG = loadImage('images/levels/level1ButtonImage.png');
  levelButton2IMG = loadImage('images/levels/level2ButtonImage.png');
  levelButton3IMG = loadImage('images/levels/level3ButtonImage.png');
  levelButton4IMG = loadImage('images/levels/level4ButtonImage.png');
  levelButton5IMG = loadImage('images/levels/level5ButtonImage.png');
  lockLevelIMG = loadImage('images/levels/lockImage.png');
  returnButtonIMG = loadImage('images/returnButtonImage.png');
  rightFacingSpikeIMG = loadImage('images/spikes/rightFacingSpikeImage.png');
  startingPortalIMG = loadImage('images/startingPortalImage.png');
  upFacingSpikeIMG = loadImage('images/spikes/upFacingSpikeImage.png');
  witchFireballIMG = loadImage('images/witchFireballImage.png');
  witchIMG = loadImage('images/witchImage.png');

  knightIMG=loadAnimation('images/standingKnightImage.png')
  knightWalkingANM = loadAnimation(
    'knightWalking/1.png',
    'knightWalking/2.png',
    'knightWalking/3.png',
    'knightWalking/4.png',
    'knightWalking/5.png'
  );

  themeSound=loadSound('sounds/themeSound.mp3');
  spikeDeathSound=loadSound('sounds/spikeDeathSound.mp3');
  levelsBackgroundSound=loadSound('sounds/levelsBackgroundSound.ogg');
  fireDeathSound=loadSound('sounds/fireDeathSound.mp3')

}



function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  //sounds()
  grounds();
  invisibleCollidersForLevel3();
  invisibleCollidersForLevel4();
  
  Background = createSprite(width / 2, height / 2, width, height);
  Background.addImage(backgroundIMG);
  Background.scale = 1.8;

  returnButton = createSprite(70, 70, 50, 50);
  returnButton.addImage(returnButtonIMG);
  returnButton.scale = 0.3;

  introButton = createSprite(width / 2 + 75, height / 2 + 250, 200, 100);
  introButton.addImage(buttonIMG);
  introButton.scale = 1.3;
  introButton.setCollider('rectangle', -75, -15, 230, 110);

  playButton = createSprite(width / 2 + 75, height / 2 + 50, 200, 100);
  playButton.addImage(buttonIMG);
  playButton.scale = 1.3;
  playButton.setCollider('rectangle', -75, -15, 230, 110);

  creditButton = createSprite(width - 70, height - 55, 100, 100);
  creditButton.addImage(buttonIMG);
  creditButton.scale = 0.7;
  creditButton.setCollider('rectangle', -75, -15, 230, 110);

  level1 = createSprite(width / 4 - 150, height / 2 - height / 8, 200, 100);
  level1.addImage(levelButton1IMG);
  level1.setCollider('rectangle', -5, -5, 125, 125);

  level2 = createSprite(width / 3, height / 2 + height / 8 - 10, 200, 100);
  level2.addImage(lockLevelIMG);
  level2.scale = 0.7;

  level3 = createSprite(width / 2, height / 2 - height / 8, 200, 100);
  level3.addImage(lockLevelIMG);
  level3.scale = 0.7;

  level4 = createSprite(
    width / 3 + width / 3,
    height / 2 + height / 8 - 10,
    200,
    100
  );
  level4.addImage(lockLevelIMG);
  level4.scale = 0.7;
  
  level5 = createSprite(
    width / 4 + width / 2 + 150,
    height / 2 - height / 8,
    200,
    100
  );
  level5.addImage(lockLevelIMG);
  level5.scale = 0.7;

  returnForLevel = createSprite(width - 70, 70, 50, 50);
  returnForLevel.addImage(returnButtonIMG);
  returnForLevel.scale = 0.3;

  ElevatorHelper1InLevel5=createSprite(3600,300,100,50);
  ElevatorHelper2InLevel5=createSprite(3600,800,100,50);

  spike1 = createSprite(500, 710, 100, 100);
  spike1.addImage(upFacingSpikeIMG);
  spike1.scale = 0.23;

  spike2 = createSprite(1300, 710, 100, 100);
  spike2.addImage(upFacingSpikeIMG);
  spike2.scale = 0.23;

  spike3 = createSprite(900, 450, 100, 100);
  spike3.addImage(downFacingSpikeIMG);
  spike3.scale = 0.6;

  knight = createSprite(100, 300, 50, 50);
  knight.addAnimation("standing",knightIMG);
  //knight.addAnimation("standing",knightWalkingANM);
  knight.debug=true;
  knight.setCollider("rectangle",-50,0,100,140)

  witch = createSprite(3600,300,1,1);
  witch.addImage(witchIMG);
  
  spikeGroup = createGroup();
  lavaFireballGroup=createGroup()
    witchFireballGroup=createGroup()

  spikeGroup.add(spike1);
  spikeGroup.add(spike2);
  spikeGroup.add(spike3);  

}



function draw() {
  background(0);
  knight.velocityX=0
  knight.velocityY = knight.velocityY+1;
  Engine.update(engine);
  drawSprites();
  //sounds()
  Background.visible = 0;
  introButton.visible = 0;
  playButton.visible = 0;
  returnForLevel.visible = 0;
  returnButton.visible = 0;
  creditButton.visible = 0;
  ElevatorHelper1InLevel5.visible=0;
  ElevatorHelper2InLevel5.visible=0;
  level1.visible = 0;
  level2.visible = 0;
  level3.visible = 0;
  level4.visible = 0;
  level5.visible = 0;
  knight.visible = 0; 

  groundGroupLevel1.setVisibleEach(0);
  groundGroupLevel2.setVisibleEach(0);
  groundGroupLevel3.setVisibleEach(0);
  groundGroupLevel4.setVisibleEach(0);
  groundGroupLevel5.setVisibleEach(0);
  spikeGroup.setVisibleEach(0);
  invisibleCollidersForLevel3Group.setVisibleEach(0);
  invisibleCollidersForLevel4Group.setVisibleEach(0);
 
  ground26.bounceOff(ElevatorHelper1InLevel5);
  ground26.bounceOff(ElevatorHelper2InLevel5);

  gamestates();
}


;


function gamestates() {
  if (gamestate === 'home') {
    Background.visible = 1;
    introButton.visible = 1;
    creditButton.visible = 1;
    playButton.visible = 1;

    if (mousePressedOver(playButton)) {
      gamestate = 'level';
    }
    if (mousePressedOver(introButton)) {
      gamestate = 'storyAndControls';
    }
    if (mousePressedOver(creditButton)) {
      gamestate = 'credits';
    }

    imageMode(CENTER);
    image(headingIMG, width / 2, height / 2 - 250, 500, 230);

    textFont('Ariel');
    fill('black');
    textSize(100);
    text('Play', playButton.x - 185, playButton.y + 10);
    textSize(50);
    text('Story and', introButton.x - 190, introButton.y - 30);
    text('Controls', introButton.x - 180, introButton.y + 30);
    text('Credits', 1725, 855);
  }

  if (gamestate === 'storyAndControls') {
    Background.visible = 1;
    returnButton.visible = 1;

    if (mousePressedOver(returnButton)) {
      gamestate = 'home';
    }

    fill('white');
    rectMode(CENTER);
    rect(width / 2, height / 2, width - 300, height - 100);

    textFont('Ariel');
    fill('black');
    textSize(35);
    text('You are a knight who was gifted the ability to make big jumps by your god because of the good works you had',180,120);
    text('done throughout your life. One day,you were going through the forest to go back home after completing your',190,170);
    text('quest. But suddenly, a witch appears in front of you, captures you in a magic bubble, and takes you to her tower',175,220);
    text('and locks you on the top floor to trap you while she was preparing the magic to extract your special ability. She',170,270);
    text('told you that after she takes your ability, she will kill you because the quest which your were coming from was to',165,320);
    text('kill her SISTER(she was a bad person btw). You have to exit the tower as soon as possible so that you can stop',180,370);
    text('the witch from taking your special ability and also to stop her from executing her plan to kill you after taking',200,420);
    text('your ability.', 870, 470);
    textSize(40);
    text("Jump with 'Up Arrow' or 'SpaceBar'", 700, 575);
    text("Move left with 'Left Arrow'                            Move right with 'Right Arrow'",380,675);

    textSize(70);
    text('All The Best!!', width / 2 - 200, 800);
  }






  if (gamestate === 'level') {
    Background.visible = 1;
    returnButton.visible = 1;
    level1.visible = 1;
    level2.visible = 1;
    level3.visible = 1;
    level4.visible = 1;
    level5.visible = 1;

    if (mousePressedOver(returnButton)) {
      gamestate = 'home';
    }
    if (mousePressedOver(level1)) {
      gamestate = 'level1';
    }
    if (mousePressedOver(level2)) {
      gamestate = 'level2';
    }
    if (mousePressedOver(level3)) {
      gamestate = 'level3';
    }
    if (mousePressedOver(level4)) {
      gamestate = 'level4';
    }
    if (mousePressedOver(level5)) {
      gamestate = 'level5';
    }
     
  }






  if (gamestate === 'credits') {
    returnButton.visible = 1;
    Background.visible = 1;

    fill('white');
    rectMode(CENTER);
    rect(width / 2, height / 2, 900, 500);

    if (mousePressedOver(returnButton)) {
      gamestate = 'home';
    }

    textFont('Ariel');
    fill('black');
    textSize(50);
    text('Coding                        Kushagra Agarwal', 550, 300);
    text('Game idea                   Kushagra Agarwal', 550, 375);
    text('Teaching the coder      Garima Aggarwal', 550, 450);
    text('from Whitehat jr.', 1000, 525);
    text('Guidance                     Garima Aggarwal', 550, 625);
  }





  if (gamestate === 'level1') {
    groundGroupLevel1.setVisibleEach(1);
    spikeGroup.setVisibleEach(1);
    knight.visible = 1;
    returnForLevel.visible = 1;

    //knightMovement();
     
    imageMode(CENTER);
    image(endingPortalIMG, 1850, 600, 150, 300);

    knight.collide(groundGroupLevel1);

    if (knight.x > windowWidth - 100) {
      gamestate = 'level';
      level2.addImage(levelButton2IMG);
      level2.scale = 1;
    }
    if(knight.y<525||knight.isTouching(spikeGroup)){
      knight.x=100;
      knight.y=675;
    }
    if (mousePressedOver(returnForLevel)){ 
      gamestate = 'level';
    }
     
    for (var i = 0; i < width; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 400, 100, 100);
    }

    fill('white');
    strokeWeight(5);
    stroke(0);
    textSize(50);
    text('Quick and easy', width/2-175, 200);    
  }






  if (gamestate === 'level2') {
    knight.visible=1
    groundGroupLevel2.setVisibleEach(1);
    returnForLevel.visible = 1;

    //knightMovement();
    lavaFireballspawn(random(450, 1450),1000, Math.round(random(10,20)));

    knight.collide(groundGroupLevel2);

    imageMode(CENTER);
    image(startingPortalIMG, 50, 300, 150, 300);
    image(endingPortalIMG, 1850, 300, 150, 300);
    image(lavaIMG, 537, 850, 275, 100);
    image(lavaIMG, 813, 850, 280, 100);
    image(lavaIMG, 1088, 850, 275, 100);
    image(lavaIMG, 1363, 850, 275, 100);

    for (var i = 0; i < width; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 100, 100, 100);
    }

    if (mousePressedOver(returnForLevel)) {
      gamestate = 'level';
    }
    if(knight.y<225){
      knight.x=200
      knight.y=350
    }

    fill('white');
    strokeWeight(5);
    stroke(0);
    textSize(50);
    text('Feeling the burn??', 750, 650);
  }









  if (gamestate === 'level3') {
    returnForLevel.visible = 1;
    groundGroupLevel3.setVisibleEach(1);
    knight.visible=1;
    invisibleCollidersForLevel3Group.setVisibleEach(1)

    imageMode(CENTER);
    image(startingPortalIMG, 50, 250, 150, 300);
    image(endingPortalIMG, 1850, 250, 150, 300);

    //knightMovement();
    knight.collide(groundGroupLevel3)

    for (var i = 0; i < 900; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 100, 100, 100);
    }
    for (var i = 1110; i < width; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 100, 100, 100);
    }
    for (var i = 425; i < 1600; i = i + 100) {
      imageMode(CENTER);
      image(upFacingSpikeIMG, i, 800, 100, 100);
    }
    for (var i = 910; i < 1110; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 470, 100, 100);
    }
    for (var i = 450; i < 800; i = i + 100) {
      imageMode(CENTER);
      image(rightFacingSpikeIMG, 400, i, 100, 100);
    }
    for (var i = 450; i < 800; i = i + 100) {
      imageMode(CENTER);
      image(leftFacingSpikeIMG, 1550, i, 100, 100);
    }
    for (var i = 150; i < 400; i = i + 100) {
      imageMode(CENTER);
      image(leftFacingSpikeIMG, 810, i, 100, 100);
    }
    for (var i = 150; i < 400; i = i + 100) {
      imageMode(CENTER);
      image(rightFacingSpikeIMG, 1110, i, 100, 100);
    }


    if (mousePressedOver(returnForLevel)) {
      gamestate = 'level';
    }
    if(knight.isTouching(invisibleCollidersForLevel3Group)){
      knight.x=100
      knight.y=300;
    }

    fill('white');
    strokeWeight(5);
    stroke(0);
    textSize(50);
    text('I can bet you died atleast once!!', 600, 40);
  }




  if (gamestate === 'level4') {
    knight.visible=1;
    returnForLevel.visible = 1;
    groundGroupLevel4.setVisibleEach(1);
    
    //knightMovement();
    knight.collide(groundGroupLevel4);

    imageMode(CENTER);
    image(startingPortalIMG, 50, 250, 150, 300);
    image(endingPortalIMG, 1850, 700, 150, 300);
    image(lavaIMG, 465, 900, 460, 100);
    image(lavaIMG, 1075, 900, 450, 100);
    image(lavaIMG, 1525, 900, 150, 100);

    lavaFireballspawn(random(400, 550),1000, 150);
    lavaFireballspawn(random(1000, 1150),1000, 100);
    lavaFireballspawn(1525,1000, Math.round(random(50, 75)));

    for (var i = 450; i < height; i = i + 100) {
      imageMode(CENTER);
      image(rightFacingSpikeIMG, 285, i, 100, 100);
    }
    for (var i = 850; i < height; i = i + 100) {
      imageMode(CENTER);
      image(leftFacingSpikeIMG, 650, i, 100, 100);
    }
    for (var i = 850; i < height; i = i + 100) {
      imageMode(CENTER);
      image(rightFacingSpikeIMG, 900, i, 100, 100);
    }
    for (var i = 525; i < height; i = i + 100) {
      imageMode(CENTER);
      image(leftFacingSpikeIMG, 1250, i, 100, 100);
    }
    for (var i = 775; i < 800; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 525, 100, 100);
    }
    for (var i = 1375; i < 1400; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 200, 100, 100);
    }
    for (var i = 50; i < 700; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 100, 100, 100);
    }
    for (var i = 925; i < 1300; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 100, 100, 100);
    }
    for (var i = 1500; i < width; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 100, 100, 100);
    }
    for (var i = 125; i < 500; i = i + 100) {
      imageMode(CENTER);
      image(leftFacingSpikeIMG, 650, i, 100, 100);
    }
    for (var i = 125; i < 500; i = i + 100) {
      imageMode(CENTER);
      image(rightFacingSpikeIMG, 900, i, 100, 100);
    }

    fill('white');
    strokeWeight(5);
    stroke(0);
    textSize(50);
    text("It's HARD!!", 1600, 400);

    if (mousePressedOver(returnForLevel)) {
      gamestate = 'level';
    }
    if(knight.isTouching(invisibleCollidersForLevel4Group)){
      knight.x=200
      knight.y=300
    }
  }


  if(gamestate==='level5'){
    returnForLevel.visible=1;
    knight.visible=1;
    groundGroupLevel5.setVisibleEach(1);
keyPressed1()
    witch.y=ground26.y-100
    
    returnForLevel.x=camera.x+900;
    returnForLevel.y=camera.y-390;
 
    //knightMovement();
    knight.collide(groundGroupLevel5);

    lavaFireballspawn(knight.x,1000,50);
    lavaFireballspawn(random(200,3800),1000,75);

    for (var i = 81; i < 3700; i = i + 100) {
      imageMode(CENTER);
      image(downFacingSpikeIMG, i, 75, 100, 100);
    }    
    for (var i = 81; i < 3700; i = i + 100) {
      imageMode(CENTER);
      image(lavaIMG, i, 900, 100, 100);
    } 



    if(knight.y<200||knight.y>750||knight.isTouching(lavaFireballGroup)||knight.isTouching(witchFireballGroup)){
      knight.x=200
      knight.y=250
    }
    if(gamestate==='level5'&&knight.x<width/2){
      camera.x=960
      camera.y=451.5
    }
    else{
      camera.x=knight.x;
    }
    if (mousePressedOver(returnForLevel)) {
      gamestate = 'level';
      witchFireballGroup.destroyEach();
      lavaFireballGroup.destroyEach();
    }
    if(frameCount%Math.round(random(90,150))===0){
      witchFireball=createSprite(3600,witch.y,1,1);
      witchFireball.addImage(witchFireballIMG);
      witchFireball.velocityX=-6;
      witchFireball.lifetime=4000  
      witchFireballGroup.add(witchFireball)
      
      var numberOfCases=Math.round(random(1,1));
      switch(numberOfCases){
        case 1:witchFireball.scale=1;
               
        break;
        case 2:witchFireball=createSprite(3600,witch.y,1,1);
               witchFireball.addImage(witchFireballIMG);
               witchFireball.scale=0.9;  
               witchFireball.velocityX=-6;
               witchFireball.lifetime=4000
        break;
        case 3:witchFireball=createSprite(3600,witch.y,1,1);
               witchFireball.addImage(witchFireballIMG);
               witchFireball.scale=0.8;
               witchFireball.velocityX=-6;
               witchFireball.lifetime=4000
        break;
        case 4:witchFireball=createSprite(3600,witch.y,1,1);
               witchFireball.addImage(witchFireballIMG);
               witchFireball.scale=0.6;  
               witchFireball.velocityX=-6;
               witchFireball.lifetime=4000
        break;
        case 5:witchFireball=createSprite(3600,witch.y,1,1);
               witchFireball.addImage(witchFireballIMG);
               witchFireball.scale=0.5;
               witchFireball.velocityX=-6;
               witchFireball.lifetime=4000
        break;
        case 6:witchFireball=createSprite(3600,witch.y,1,1);
               witchFireball.addImage(witchFireballIMG);
               witchFireball.scale=0.3;
               witchFireball.velocityX=-6;
               witchFireball.lifetime=4000
        break;
        default:break}
        
      

    }



  }
  else{
    camera.x=960
    camera.y=451.5

    returnForLevel.x=width-70
    returnForLevel.y=70
  }
}






function keyPressed1() {
 
  // 38 = up arrow
  // 32 = spacebar
  if (keyDown('UP_ARROW') || keyCode===32) {
    knight.velocityY = -10;
  }
  if (keyDown(RIGHT_ARROW)) {
    knight.velocityX = 8;
    knight.addAnimation("standing",knightWalkingANM)
    //knight.changeAnimation("standing",knightWalkingANM)                              
  }   
  else{
    knight.addAnimation("standing",knightIMG);
  }
  if (keyDown(LEFT_ARROW)) {
    knight.velocityX = -8;
  }
}




function lavaFireballspawn(x,y,f) {
  if (frameCount % f === 0) {
    lavaFireball = createSprite(x, y, 50, 100);
    lavaFireball.addImage(lavaFireballIMG);
    lavaFireball.scale = 0.8;
    lavaFireball.velocityY = -10;
    lavaFireball.lifetime = 120;
    lavaFireballGroup.add(lavaFireball);
  }
}






function grounds(){
 
  groundGroupLevel1 = createGroup();
  groundGroupLevel2 = createGroup();
  groundGroupLevel3 = createGroup();
  groundGroupLevel4 = createGroup();
  groundGroupLevel5 = createGroup();

  // In level 1
  for(var i=275;i<width+100;i=i+560){
    ground1 = createSprite(i, 928, 1000, 500);
    ground1.addImage(groundIMG);
    ground1.scale = 1;
    groundGroupLevel1.add(ground1);
  }
  for(var i=275;i<width+100;i=i+560){
    ground2 = createSprite(i, 170, width, 500);
    ground2.addImage(groundIMG);
    ground2.scale = 1;
    groundGroupLevel1.add(ground2);
  }
    // In level 2
  for(var i=630;i<height+400;i=i+365){  
    ground3 = createSprite(118, i, 500, 500);
    ground3.addImage(groundIMG);
    groundGroupLevel2.add(ground3);
  }
  for(var i=630;i<height+400;i=i+365){  
    ground4 = createSprite(1780, i, 500, 500); 
    ground4.addImage(groundIMG);
    groundGroupLevel2.add(ground4);
  }
  for(var i=200;i<width;i=i+562){  
    ground5 = createSprite(i, -130, width / 4, 100);
    ground5.addImage(groundIMG);
    groundGroupLevel2.add(ground5);
  }
  for(var i=445;i<width-400;i=i+112){  
    ground6 = createSprite(i, 486, 275, 50);
    ground6.addImage(groundIMG);
    ground6.scale=0.2;
    groundGroupLevel2.add(ground6);
  }   
    
  // In level 3
  for(var i=580;i<height+300;i=i+365){
    ground7 = createSprite(70, i, 350, 600);
    ground7.addImage(groundIMG);
    groundGroupLevel3.add(ground7);
  }
  for(var i=250;i<width+100;i=i+562){
    ground8 = createSprite(i, -127, width / 4, 100);
    ground8.addImage(groundIMG);
    groundGroupLevel3.add(ground8);
  }  
  for(var i=580;i<height+300;i=i+365){
    ground9 = createSprite(1880, i, 350, 600);
    ground9.addImage(groundIMG);
    groundGroupLevel3.add(ground9);
  } 
  for(var i=548;i<width-100;i=i+394){
    ground10 = createSprite(i, 975, 310, 100);
    ground10.scale=0.7
    ground10.addImage(groundIMG);
    groundGroupLevel3.add(ground10);
  }  
  for(var i=90;i<height-520;i=i+132){
    ground11 = createSprite(width / 2, i, 200, 200);
    ground11.addImage(groundIMG);
    ground11.scale=0.36
    groundGroupLevel3.add(ground11);
  } 
    // In level 4
  for(var i=580;i<height+100;i=i+365){  
    ground12 = createSprite(-45, i, 275, 600);
    ground12.addImage(groundIMG);
    groundGroupLevel4.add(ground12);
  }
  for(var i=1025;i<height+300;i=i+365){  
    ground13 = createSprite(1880, i, 350, 200);
    ground13.addImage(groundIMG);
    groundGroupLevel4.add(ground13);
  }
  for(var i=100;i<width+100;i=i+560){  
    ground14 = createSprite(i, -127, width / 4, 100);
    ground14.addImage(groundIMG);
    groundGroupLevel4.add(ground14);
  }  
  for(var i=850;i<height+1000;i=i+560){  
    ground15 = createSprite(775, i);
    ground15.addImage(groundIMG);
    ground15.scale=0.27
    groundGroupLevel4.add(ground15);
  } 
  for(var i=27;i<500;i=i+100){  
    ground16 = createSprite(775, i);
    ground16.addImage(groundIMG);
    ground16.scale=0.27
    groundGroupLevel4.add(ground16);
  }  
  for(var i=100;i<200;i=i+500){  
    ground17 = createSprite(1375, i);
    ground17.addImage(groundIMG);
    ground17.scale=0.27
    groundGroupLevel4.add(ground17);
  }  
  for(var i=520;i<height+100;i=i+99){  
    ground18 = createSprite(1375, i);
    ground18.addImage(groundIMG);
    ground18.scale=0.27
    groundGroupLevel4.add(ground18);
  }    

  // level5
  for(var i=100;i<4000;i=i+560){  
    ground19 = createSprite(i, -150, width / 4, 100);
    ground19.addImage(groundIMG);
    groundGroupLevel5.add(ground19);
  }  
  for(var i=4012;i<5000;i=i+560){  
    ground20 = createSprite(i, 150, width / 4, 100);
    ground20.addImage(groundIMG);
    groundGroupLevel5.add(ground20);
  } 
  for(var i=4012;i<5000;i=i+560){  
    ground21 = createSprite(i, 515, width / 4, 100);
    ground21.addImage(groundIMG);
    groundGroupLevel5.add(ground21);
  } 
  for(var i=4012;i<5000;i=i+560){  
    ground22 = createSprite(i, 880, width / 4, 100);
    ground22.addImage(groundIMG);
    groundGroupLevel5.add(ground22);
  } 
  for(var i=-150;i<height+200;i=i+365){  
    ground23 = createSprite(-250, i, width / 4, 100);
    ground23.addImage(groundIMG);
    groundGroupLevel5.add(ground23);
  } 
  for(var i=250;i<3700;i=i+600){  
    ground24 = createSprite(i, 400, width / 4, 100);
    ground24.addImage(groundStripIMG);
    ground24.scale=0.3
    groundGroupLevel5.add(ground24);
  } 
  for(var i=550;i<3500;i=i+600){  
    ground25 = createSprite(i, 600, width / 4, 100);
    ground25.addImage(groundStripIMG);
    ground25.scale=0.35
    groundGroupLevel5.add(ground25);
  } 

  ground26=createSprite(3600,500,1,1);
  ground26.addImage(groundStripIMG);
  ground26.scale=0.35
  ground26.velocityY=3
  groundGroupLevel5.add(ground26);
  
}




function invisibleCollidersForLevel3(){

  invisibleCollidersForLevel3Group=createGroup();

  collider1=createSprite(400,150,800,10);
  collider2=createSprite(1550,150,800,10);
  collider3=createSprite(width/2,750,1100,10);
  collider4=createSprite(400,420,100,10);
  collider5=createSprite(1550,420,100,10);
  collider6=createSprite(810,400,100,10);
  collider7=createSprite(1110,400,100,10);
  collider8=createSprite(width/2,510,100,10);
  collider9=createSprite(765,280,10,200);
  collider10=createSprite(1155,280,10,200);
  collider11=createSprite(440,600,10,300);
  collider12=createSprite(1510,600,10,300);
  collider13=createSprite(880,450,10,100);
  collider14=createSprite(1040,450,10,100);

  invisibleCollidersForLevel3Group.add(collider1);
  invisibleCollidersForLevel3Group.add(collider2);
  invisibleCollidersForLevel3Group.add(collider3);
  invisibleCollidersForLevel3Group.add(collider4);
  invisibleCollidersForLevel3Group.add(collider5);
  invisibleCollidersForLevel3Group.add(collider6);
  invisibleCollidersForLevel3Group.add(collider7);
  invisibleCollidersForLevel3Group.add(collider8);
  invisibleCollidersForLevel3Group.add(collider9);
  invisibleCollidersForLevel3Group.add(collider10);
  invisibleCollidersForLevel3Group.add(collider11);
  invisibleCollidersForLevel3Group.add(collider12);
  invisibleCollidersForLevel3Group.add(collider13);
  invisibleCollidersForLevel3Group.add(collider14);
}


function invisibleCollidersForLevel4(){

  invisibleCollidersForLevel4Group=createGroup();

  collider15=createSprite(width/2,140,width,10);
  collider16=createSprite(780,810,300,10);
  collider17=createSprite(275,420,100,10);
  collider18=createSprite(1375,240,100,10);
  collider19=createSprite(670,460,100,10);
  collider20=createSprite(890,460,100,10);
  collider21=createSprite(775,560,100,10);
  collider22=createSprite(1275,490,100,10)
  collider23=createSprite(width/2-50,height-50,1400,10);
  collider24=createSprite(620,300,10,300);
  collider25=createSprite(930,300,10,300);
  collider26=createSprite(320,640,10,400);
  collider27=createSprite(1220,680,10,400);
  collider28=createSprite(720,500,10,100);
  collider29=createSprite(825,500,10,100);
  collider30=createSprite(630,830,10,50);
  collider31=createSprite(930,830,10,50);
  collider32=createSprite(1330,200,10,80);
  collider33=createSprite(1430,200,10,80);

  invisibleCollidersForLevel4Group.add(collider15);
  invisibleCollidersForLevel4Group.add(collider16);
  invisibleCollidersForLevel4Group.add(collider17);
  invisibleCollidersForLevel4Group.add(collider18);
  invisibleCollidersForLevel4Group.add(collider19);
  invisibleCollidersForLevel4Group.add(collider20);
  invisibleCollidersForLevel4Group.add(collider21);
  invisibleCollidersForLevel4Group.add(collider22);
  invisibleCollidersForLevel4Group.add(collider23);
  invisibleCollidersForLevel4Group.add(collider24);
  invisibleCollidersForLevel4Group.add(collider25);
  invisibleCollidersForLevel4Group.add(collider26);
  invisibleCollidersForLevel4Group.add(collider27);
  invisibleCollidersForLevel4Group.add(collider28);
  invisibleCollidersForLevel4Group.add(collider29);
  invisibleCollidersForLevel4Group.add(collider30);
  invisibleCollidersForLevel4Group.add(collider31);
  invisibleCollidersForLevel4Group.add(collider32);
  invisibleCollidersForLevel4Group.add(collider33);
}


function sounds(){

  if(gamestate==='home' || gamestate==='storyAndControls' || gamestate==='credits'|| gamestate==='level'){
    themeSound.play();
  }
  if(gamestate === 'level1' || gamestate === 'level2' || gamestate === 'level3' || gamestate === 'level4' || gamestate === 'level5'){
    levelsBackgroundSound.play()
  }

  
  //spikeDeathSound.play();
  
  //fireDeathSound.play();
}