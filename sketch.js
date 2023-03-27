const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var trophyButton;
var kabuto,marchamp,rino1,scizor,trophy,forestbg,garchomp;
  combat
  var kabutoImg,marchampImg,scizorImg,rinoImg,combat,darkball,combatImage;
var score=0; //integer
var gameState= "start"; //string 
var pc;

function preload()
{
  kabutoImg=loadImage('kabu.png')
  marchampImg=loadImage('machamp.png')
  rinoImg=loadImage('rino.png')
  scizorImg=loadImage('scizor-f.png')
  forestbg=loadImage("forest.jpg")
  garchompImg=loadImage("garchop.png")
  combatImage=loadImage("combat.png")
  darkball=loadImage("dark ball.png")
}

function setup() {
  createCanvas(1700,850);
  kabuto=createSprite(450,350,50,50)
  kabuto.addImage(kabutoImg) 

  marchamp=createSprite(700,350,50,50)
  marchamp.addImage(marchampImg) 

  rino1=createSprite(950,350,25,25)
  rino1.addImage(rinoImg)
  rino1.scale=0.3
  
  scizor=createSprite(1200,350,50,50)
  scizor.addImage(scizorImg) 
  
  trophyButton=createImg("trophy.png")
  trophyButton.position(10,10)
  trophyButton.size(50,50);

  //groups
  garchompGroup = new Group();
  combatGroup=new Group();
 
}

function draw() 
{
  background(51);
  imageMode(CENTER);
  image(forestbg,850,425,1700,850)
  
  drawSprites();

  fill('yellow')
  textSize(20);
  stroke("red")
  strokeWeight(5)
  text('number of trophy: '+score,70,50)

  //text(message , x , y)
  if(gameState=="start"){
    fill('yellow')
    textSize(30)
    text('Choose the pokemon',700,130);


    if(mousePressedOver(kabuto) ||
       mousePressedOver(marchamp)||
       mousePressedOver(scizor)||
       mousePressedOver(rino1)){
        
        gameState = "play"

    }

    if(mousePressedOver(kabuto)){
      gameState = "obstacle";
      pc = kabuto;
      marchamp.destroy();
      scizor.destroy();
      rino1.destroy();
      kabuto.x=800;
      kabuto.y=600;
    }
    if(mousePressedOver(marchamp)){
      gameState = "obstacle";
      pc = marchamp;
      kabuto.destroy();
      scizor.destroy();
      rino1.destroy();
      marchamp.x=500;
      marchamp.y=600;

    }
    if(mousePressedOver(scizor)){
      gameState = "obstacle"
      pc = scizor;
      kabuto.destroy();
      marchamp.destroy();
      rino1.destroy();
      scizor.x=800;
      scizor.y=600;
    }
    if(mousePressedOver(rino1)){
      gameState = "obstacle";
      pc = rino1;
      kabuto.destroy();
      marchamp.destroy();
      scizor.destroy();
      rino1.x=800;
      rino1.y=600;
    }
  }

  if(gameState === "obstacle"){
    spawnGarchomp();
    
    if (keyDown("right")){
      pc.x= pc.x + 3;
    }
    if (keyDown("left")){
      pc.x= pc.x - 3;

    }
    if (keyDown("down")){
      pc.y= pc.y + 3;
    }
    if (keyDown("up")){
      pc.y= pc.y - 3;
    }
    if (keyDown("space")){
      combat=createSprite(pc.x,pc.y);
      combat.addImage("bullets",combatImage);
      combat.scale = 0.5;
      combat.velocityY =-4;
      combatGroup.add(combat);
      combat.debug=true;
    }
    if(combatGroup.isTouching(garchompGroup)){
      garchompGroup[0].destroy();
      combatGroup[0].destroy();
      score=score+1;
    }

    //end condition
    if (garchompGroup.isTouching(pc)) {
      gameState="end";
    }
  }
  
  //end game state
  if (gameState === "end"){
    garchompGroup.destroyEach();
    pc.destroy();
    combatGroup.destroyEach();

    fill('red')
    textSize(50)
    stroke("white")
    strokeWeight(5)
    text('You Loose',400,130);
    
    swal({
      text:"YOU LOST THE GAME!!",
      text:  `Total trophys ${'\n'} ${score}`,
      imageUrl:"http://i.imgur.com/D4ikBdJ.gif",
      imageSize:"100x100",
      confirmButtonText:"Play Again"
    },
     function(isConfirm){
      if(isConfirm){
         location.reload()
      }
     }
    )
  }


}

function spawnGarchomp(){
  if (frameCount % 60 === 0){
    garchomp=createSprite(600,30);
    garchomp.x = random(100,1000);
    garchomp.velocityY= 2;
    garchomp.lifetime = 425;
    garchomp.addImage(garchompImg);
    garchomp.scale=0.5;
    garchompGroup.add(garchomp);
    garchomp.debug = true;
  }
}

