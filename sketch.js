var ball;
var position, database
function setup(){
    createCanvas(500,500);

    database=firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    // .ref() is used to create reference to the location of db value.
    var ballP=database.ref('Ball/position');
   //.on() creates listener which keeps listening to db
    ballP.on("value",readPosition)
}

function draw(){
    background("white")
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

//Update back to the database
function writePosition(x,y){
    //.set() Is used to set values in DATABASE.
    database.ref('Ball/position').set({
      x:position.x+x,
      y:position.y+y
      
    })
}

//Reading Values From DATABASE
function readPosition(data){
    //val() is used to retrive data from the database.
   position = data.val();
   ball.x=position.x;
   ball.y=position.y;
}
