//first request that goes out from teh browser is an http request only
//it later gets upgraded in teh server to a websocket request

const express = require('express');
const WebSocket = require('ws'); // Correct import for WebSocket

const app = express();
const httpServer = app.listen(8080, ()=>{
    console.log(`listening`)
});

// WebSockets logic
//What this does: Adds WebSocket functionality to the HTTP server.
const wss = new WebSocket.Server({ server: httpServer }); // Access the Server class

let userCount = 0;
wss.on('connection', function connection(ws) {
//What this does: Runs a function whenever a client connects to the server.
//ws: This represents the specific WebSocket connection for that client.
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  //What this does: When the server receives a message (data) from a client, 
  // it loops through all connected clients.
  //If a client is ready (WebSocket.OPEN), it sends the received message (data) 
  // to that client.
  //Why this is cool: It allows broadcasting messages to all connected clients, 
  // enabling real-time group communication like in a chat app.

  console.log(`client connected ${++userCount}`)
  ws.send('Hello! Message From Server!!');
});
