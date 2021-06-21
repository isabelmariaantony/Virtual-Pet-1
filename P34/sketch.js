//Create variables here
var dog; 
var happyDog;
var database;
var foodS;
var foodStock;
var fedTime;
var lastFed;
var foodObj;
var feed ;
var addFood;

function preload()
{
	//load images here
  dogImg = loadImage("Images/dogImg.png");
  dogHappy = loadImage("Images/dogImg1.png");
}
  


function setup() {
	createCanvas(1000, 500);
  background('rgba(0,255,0, 0.25)');
  dog = createSprite(800, 200, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.4
  db = firebase.database();
  foodStock = db.ref('Food');
  foodStock.on("value", readStock);
  foodObj = new Food();
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46, 139, 87)
foodObj.display();

fedTime = db.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM", 350,30);
}
  drawSprites();
}
function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)  
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//Function to read values from database

//Function to write values in database
function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  db.ref('/').update({
    Food:x
  })
}



