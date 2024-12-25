//first request that goes out from teh browser is an http request only
//it later gets upgraded in teh server to a websocket request

const express = require('express');
const WebSocket = require('ws'); // Correct import for WebSocket

const app = express();
const httpServer = app.listen(8080, ()=>{
    console.log(`listening`)
});

// WebSockets logic
const wss = new WebSocket.Server({ server: httpServer }); // Access the Server class

let userCount = 0;
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log(`client connected ${++userCount}`)
  ws.send('Hello! Message From Server!!');
});
