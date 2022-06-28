/**
 * Written for UTSC New Media in Theory
 * Parts of this code is adapted from Nick Puckett & Kate Hartman's Creation & Computation PubNub Code
 * 
 * This file sets up the publish and subscribe events for the all of the pubnub pages on this website.  
*/

let dataServer;
let pubKey = "pub-c-f7e4ffd6-e9bc-4c70-9fb8-4a120d50d91e";
let subKey = "sub-c-1d418a72-3059-49cd-81cb-f2be471ebb2c";
let secretKey = "sec-c-MjA3NzE3NWUtZDEyMC00NzY4LTg3MGQtZTE4NGY1NjIwN2I4";

function createServer(y) {

  dataServer = new PubNub({
    subscribeKey: subKey,
    publishKey: pubKey,
    uuid: y,
    secretKey: secretKey,
    heartbeatInterval: 0,
  });

}

