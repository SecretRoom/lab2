/* eslint-disable no-console */
const express = require('express')
const config = require('config')
const WebSocket = require('ws');
const http = require("http");

const app = express()
app.use(express.json({ extended: true }))
app.use('', require('./routes/Main'))
const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
  ws.on('message', m => {
    ws.send(m.toString())
  });

  ws.on("error", e => ws.send(e));
});

server.listen(config.get('port'), () => console.log("Server started"))