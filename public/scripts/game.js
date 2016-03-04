;(function () {
  'use strict';

  const ws = io.connect();
  ws.on('connect', () => {
    console.log("Signature socket, you're ready to rock-it");
  });

  const player1 = 'X';
  const player2 = 'O';
  let currentPlayer = player1;
  let gameEnd = false;
  var board = {
    'A': '', 'B':'', 'C':'',
    'D': '', 'E':'', 'F':'',
    'G': '', 'H':'', 'I': ''
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
      console.log(`Congrats ${player}, you win!`);
      return true;
    }
      return false;
  }

  document.addEventListener('click', (event) => {
    const square = event.target;

    if (!square.hasAttribute('data-cell') && !gameEnd) {
      markSquare(square, currentPlayer);
      console.log("SQUARE", square);

      gameEnd = didYouWin(currentPlayer);

      if (gameEnd) {
        alert(`Congrats ${currentPlayer}, you win!`);
      } else if (currentPlayer === player1) {
        currentPlayer = player2;
      } else if (currentPlayer === player2) {
        currentPlayer = player1;
      }
    }
  })

}());
