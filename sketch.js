var balloon,backgroundImg;
var balloonImg,balloonImg2;
var database;

function preload() {
  backgroundImg = loadImage("Background.jpg");
  balloonImg = loadImage("Balloon.png")
  balloonImg2 = loadImage("Balloon2.png")
}

function setup() {
  createCanvas(1000,600);

  database = firebase.database()

  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(balloonImg)
  balloon.scale = 0.3

  balloonRef = database.ref('balloon/position')
  balloonRef.on('value',readDatabase,showErr)

}

function draw() {
  background(backgroundImg);  
  textSize(20)
  fill("lightBlue")
  stroke(100)
  text("Use Arrow Keys to move Hot Air balloon",50,40)
  

  if(keyDown(LEFT_ARROW)){
    writePosition(-2,0);
}
  else if(keyDown(RIGHT_ARROW)){
    writePosition(2,0);
}
  else if(keyDown(UP_ARROW)){
    writePosition(0,-2);
    balloon.addAnimation("hotAirBalloon",balloonImg2)
    balloon.scale = balloon.scale -0.001
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+2);
    balloon.addAnimation("hotAirBalloon",balloonImg2)
    balloon.scale = balloon.scale +0.001
}
  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set(
  {'x':balloon.x + x,
  'y':balloon.y + y})
}

function readDatabase(data){
  pos = data.val()
  balloon.x = pos.x
  balloon.y=pos.y
}

function showErr(){

  console.log("error")
}
