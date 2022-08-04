const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var ground;
var rope;
var fruit;
var fruitConnector;

var rabbit;
var rabbitImg;
var backgroundImg;
var melon;
var cutImg;

var blink;
var eat;
var sad;

function preload(){
  backgroundImg = loadImage("background.png");
  rabbitImg = loadImage("Rabbit-01.png");
  melon = loadImage("melon.png");

  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {

  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  cutImg = createImg("cut_btn.png");
  cutImg.position(200,25);
  cutImg.size(60,60);
  cutImg.mouseClicked(drop);

  rope = new Rope(8,{x: 230, y: 30});

  ground = new Ground(200,690,600,20);



  rabbit = createSprite(300,600,50,50);
  rabbit.addAnimation("blinking", blink);
  rabbit.addAnimation("eating", eat);
  rabbit.addAnimation("crying", sad);
  rabbit.changeAnimation("blinking");
  rabbit.scale = 0.3;


  fruit = Bodies.circle(300,100,70);

  Matter.Composite.add(rope.body, fruit);

  fruitConnector = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  ground.debug = true;
}

function draw() {

  background(51);
  image(backgroundImg,0,0,displayWidth + 80,displayHeight);
  //ellipse(fruit.position.x, fruit.position.y, 20, 20);
  //push();
  //imageMode(CENTER);
  if(fruit != null){
    image(melon, fruit.position.x, fruit.position.y, 70, 70)
  }
  //pop();
  rope.show();
  Engine.update(engine);
  ground.show();

  if(collision(fruit, rabbit) == true){
    rabbit.changeAnimation("eating")
  }

  if(collision(fruit, ground.body) == true){
    rabbit.changeAnimation("crying")
  }
  drawSprites();
}

function drop(){
  rope.break();
  fruitConnector.detach();
  fruitConnector = null;
}

function collision(bodyA,bodyB){
  if(bodyA!=null){
    var distance1 = dist(bodyA.position.x, bodyA.position.y, bodyB.position.x, bodyB.position.y)
    if(distance1 <= 80){
      World.remove(engine.world, fruit)
      fruit = null
      return true
    } 
    else{return false}
  }
}
