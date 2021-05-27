var dog,dogImg,happyDog,database,foodS,foodStock;
var feed,addFood,fedTime,lastFed,foodObj;

function preload()
{
   dogImg = loadImage("images/dogImg1.png");
   happyDog = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,600);
  
  dog = createSprite(415,290,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  foodObj = new milk();
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime=database.ref('Feed Time');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  drawSprites();

 
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock(-1));
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
   
}

function readStock(data){
   foodS = data.val();
}

