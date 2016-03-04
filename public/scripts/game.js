;(function () {
  'use strict';

  const player1 = 'X';
  const player2 = 'O';
  let currentPlayer = player1;
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
    const moves = document.querySelectorAll(`[data-cell="${player}"]`);
    let moveArray = []
    // console.log("Where is this player", moves);
    for (var i = 0; i < moves.length; i++) {
      moveArray.push(moves[i].id);
    }
    console.log("moveArray", moveArray);

    console.log("BOARD STATE", board);

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
    }
  }

  document.addEventListener('click', (event) => {
    const square = event.target;

    if (!square.hasAttribute('data-cell')) {
      markSquare(square, currentPlayer);
      console.log("SQUARE", square);

      didYouWin(currentPlayer);

      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else if (currentPlayer === player2) {
        currentPlayer = player1;
      }
    }
  })

}());
