'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ws = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
})


server.listen(PORT, () => {
  console.log("HEY, You've got a running server on port ", PORT);
});

const activeGames = [];

ws.on('connection', socket => {
  console.log("Socket to me:", socket.id);

  socket.on('validMove', (move) => {
    console.log("Made a move", move.board);
    console.log("who moved", move.player);
    ws.sockets.emit('moved', move);
    // socket.broadcast.emit('moved', move);
    console.log(">.<");
  })

})
