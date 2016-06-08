'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ws = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('lobby');
})

app.get('/game', (req, res) => {
  res.render('index');
})


server.listen(PORT, () => {
  console.log("HEY, You've got a running server on port ", PORT);
});

let activeGames = 0;

ws.on('connection', socket => {
  ws.sockets.connected[socket.id].emit('whoDis', socket.id);

  console.log("Socket to me:", socket.id);
  activeGames++
  console.log("Connected Users:", activeGames);

  socket.on('disconnect', () => {
    activeGames--;
    console.log("Connected Users:", activeGames);
  })

  socket.on('create', () => {
    let theRoom = activeGames;
    console.log("Yay?", socket.id);
    if (activeGames % 2 !== 0) {
      socket.join(`${theRoom}`);
      ws.sockets.in(`${theRoom}`).emit('test', theRoom);
    } else {
      theRoom = theRoom - 1
      socket.join(`${theRoom}`);
      ws.sockets.in(`${theRoom}`).emit('test', theRoom);
    }
  })

  socket.on('validMove', (move) => {
    // ws.sockets.emit('moved', move);
    // socket.broadcast.emit('moved', move); // Players take turns, but all play the same game
    ws.sockets.in(move.room).emit('moved', move); // This allows multiplayer, but it's a race
    // ws.in(move.room).broadcast.emit('moved', move);
  })

})
