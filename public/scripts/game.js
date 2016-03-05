;(function () {
  'use strict';

  let gameInfo = {};
  const player1 = 'X';
  const player2 = 'O';
  let canMove = true;
  let currentPlayer = player1;
  let gameEnd = false;
  var board = {
    'A': '', 'B':'', 'C':'',
    'D': '', 'E':'', 'F':'',
    'G': '', 'H':'', 'I': ''
  }

  const ws = io.connect();
  ws.on('connect', () => {
    ws.emit('create');
  });

  ws.on('test', (whichRoom) => {
    gameInfo.myRoom = whichRoom;
    console.log("whichRoom", gameInfo.myRoom);
  })
  ws.on('whoDis', (sockID) => {
    gameInfo.whoMe = sockID;
    console.log("sockID", gameInfo.whoMe);
  })

  ws.on('moved', (newMove) => {
    // Update Board State
    board = newMove.board;

    // Make sure boards match on both sides
    for (var thing in board) {
      if(board[thing]) {
        markSquare(document.getElementById(thing), board[thing])
      }
    }

    gameEnd = didYouWin(newMove.player);

    if (gameEnd) {
      alert(`Sorry! You Lost!`);
    } else {
      swapPlayer(newMove.player)
      canMove = true;
    }
  });

  function swapPlayer (current) {
        if (current === player1) {
        currentPlayer = player2;
      } else if (current === player2) {
        currentPlayer = player1;
      }
  }

  function markSquare (space, player) {
    space.textContent = player;
    const where = document.createAttribute('data-cell');
    where.value = player;
    board[space.id] = player;
    space.setAttributeNode(where);
    return space;
  }

  function didYouWin (player) {
    if (
      // Horizontal matches
      (board.A === player && board.B === player && board.C === player) ||
      (board.D === player && board.E === player && board.F === player) ||
      (board.G === player && board.H === player && board.I === player) ||
      // Vertical matches
      (board.A === player && board.D === player && board.G === player) ||
      (board.B === player && board.E === player && board.H === player) ||
      (board.C === player && board.F === player && board.I === player) ||
      // Diagonal matches
      (board.A === player && board.E === player && board.I === player) ||
      (board.C === player && board.E === player && board.G === player)
    ) {
      return true;
    }
      return false;
  }

  document.addEventListener('click', (event) => {
    const square = event.target;

    if (!square.hasAttribute('data-cell') && !gameEnd && canMove && square.tagName === 'TD') {

      markSquare(square, currentPlayer);

      canMove = false;
      const move = {
        board: board,
        square: square,
        player: currentPlayer,
        room: myRoom
      };
      ws.emit('validMove', move);

      gameEnd = didYouWin(currentPlayer);

      if (gameEnd) {
        alert(`Congrats ${currentPlayer}, you win!`);
      } else {
        swapPlayer(currentPlayer);
      }

    }
  })

}());
