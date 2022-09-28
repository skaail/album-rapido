const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const figurinha = []

io.on('connection', (socket) => {
    socket.on('con', function(){
        io.emit('att',  figurinha)
    })
    socket.on('chat message', function(msg){
        figurinha.push({id : msg})
        console.log(figurinha)
        io.emit('chat message', msg);
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});