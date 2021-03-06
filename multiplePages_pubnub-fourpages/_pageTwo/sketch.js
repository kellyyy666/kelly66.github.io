
/**In this example, we use PubNub to connect to three pages, and show three different types of visualizations on each sketch. **/

let channelName = "page2";
let cursors = [];

let x;
let y;
let who; 

function setup() {

    createCanvas(windowWidth, windowHeight);

    // listen for messages coming through the subcription feed on this specific channel. 
    dataServer.addListener({ message: readIncoming});
    dataServer.subscribe({ channels: [channelName] });

    // create a new JSON object to store our data
    new allCursors(mouseX,mouseY,dataServer.getUUID())

    textSize(60);
    textAlign(CENTER);
    fill(0,255,0);

    let page1 = createA('/../index.html', 'Go to page 1');
    page1.position(100, 300);
    let page3 = createA('/../_pageThree/index.html', 'Go to page 3');
    page3.position(100, 400);
    let page4 = createA('/../_pageFour/index.html', 'Go to page 4');
    page4.position(100, 500);


    dataServer.addListener({ message: readIncoming});
    dataServer.subscribe({ channels: [channelName] });
  
    // create a new JSON object to store our data
    new allCursors(mouseX,mouseY,dataServer.getUUID())
  
  }
  
function draw() {

  background(255);
  text("This is page 2 with circles", windowWidth/2, windowHeight/2);


  sendTheMessage(); // send the message with the cursor location every 100ms.   

  for (let i = 0; i < cursors.length; i++) { // loop through all the cursors and show them on the page
    stroke(0);
    strokeWeight(1);
    ellipse(cursors[i].x, cursors[i].y, 25, 25);
  
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
    },
  });
}

function readIncoming(inMessage) {
  // when new data comes in it triggers this function,
  // we call this function in the setup

  /*since an App can have many channels, we ensure that we are listening
  to the correct channel */

  if (inMessage.channel == channelName) {

   x = inMessage.message.x // get the mouseX value from the other people
   y = inMessage.message.y // get the mouseY value from the other people
   who = inMessage.publisher; // who sent the message

 //  console.log(inMessage); //logging for information

   let newinput = true; // we are checking to see if this person who sent the message is already on the page. 

      for(let i = 0; i<cursors.length;i++) { // loop through all the IDs that have sent us messages before
        if(who==cursors[i].who) { // if who is already in our array, update the x & y values
          cursors[i].x = x;
          cursors[i].y = y;
          newinput = false;    // set the boolean to false since this is not a new user
        }
      }
      if(newinput) { // if this is a new user, create a new JSON object that we add to our array
        cursors.push(new allCursors(x,y, who));
      }
  }
}
function allCursors(x,y,who){ // creates a new JSON object for us
 
  this.x = x; // this is shorthand for saying "this object"
  this.y = y;
  this.who = who;

}