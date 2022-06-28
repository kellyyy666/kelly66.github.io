
var cursors = [];

// variable used for incoming messages
var x;
var y;
var r;
var g;
var b;
var who;  

let channelName = "rungingseajelly";

// variables from the previous page
var url = new URL(window.location.href);
var you = url.searchParams.get("you");
var redVal = url.searchParams.get("r");
var greenVal = url.searchParams.get("g");
var blueVal = url.searchParams.get("b");

// printing out the values so that we know what is going on. 
console.log(you);
console.log(redVal);
console.log(greenVal);
console.log(blueVal);

createServer(you); // creating our pubnub server with our name.

function setup() {

    createCanvas(windowWidth, windowHeight);

    // listen for messages coming through the subcription feed on this specific channel. 
    dataServer.addListener({ message: readIncoming});
    dataServer.subscribe({ channels: [channelName] });

    // create a new JSON object to store the mouse position, colours, and name of the user from the previous page
    new allCursors(mouseX, mouseY, redVal, greenVal, blueVal, you);
  
  }
  
function draw() {

  background(40,150,200);

  sendTheMessage(); // send the message with the cursor location every 100ms.   

  for (let i = 0; i < cursors.length; i++) { // loop through all the cursors and show them on the page
    noStroke(0);
    fill(cursors[i].r,cursors[i].g,cursors[i].b)
    ellipse(cursors[i].x, cursors[i].y, 100, 100);
    textSize(30);
    textAlign(CENTER);
    fill(255-cursors[i].r,255-cursors[i].g,255-cursors[i].b); // make the text colour different
    text(cursors[i].who, cursors[i].x, cursors[i].y+5);
  
  }
}
  
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases

  dataServer.publish({
    channel: channelName,
    message: {
      x: mouseX,
      y: mouseY,
      r: redVal, 
      g: greenVal,
      b: blueVal
    },
  });
}

function readIncoming(inMessage) {
  // when new data comes in it triggers this function,
  // we call this function in the setup

  /*since an App can have many channels, we ensure that we are listening
  to the correct channel */

  if (inMessage.channel == channelName) {

   x = inMessage.message.x; // get the mouseX value from the other people
   y = inMessage.message.y; // get the mouseY value from the other people
   r = inMessage.message.r; // get the red value from the other people
   g = inMessage.message.g; // get the green value from the other people
   b = inMessage.message.b; // get the blue value from the other people
   who = inMessage.publisher; // who sent the message

  //console.log(inMessage); //logging for information

   let newinput = true; // we are checking to see if this person who sent the message is already on the page. 

      for(let i = 0; i<cursors.length;i++) { // loop through all the IDs that have sent us messages before
        if(who==cursors[i].who) { // if who is already in our array, update the x & y values
          cursors[i].x = x;
          cursors[i].y = y;
          newinput = false;    // set the boolean to false since this is not a new user
        }
      }
      if(newinput) { // if this is a new user, create a new JSON object that we add to our array
        cursors.push(new allCursors(x,y,r,g,b,who));
      }
  }
}
function allCursors(x,y,r,g,b,who){ // creates a new JSON object for us
 
  this.x = x; // this is shorthand for saying "this object"
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.who = who;

}