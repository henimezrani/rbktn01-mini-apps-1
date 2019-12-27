class Player {
  constructor(name, score, symbol) {
    this.name = name;
    this.score = score;
    this.symbol = symbol
  }

  updateScore() {

    // Updates the player's score
    this.score++;
  }
}

class Game {
  constructor() {
    this.board = []
    this.players = []
    this.gamesCount = []
    this.currentPlayer;
  }

  addPlayers(name1, name2) {

    // Create 2 player instances
    var player1 = new Player(name1, 0, "X");
    var player2 = new Player(name2, 0, "O");

    // Push players to the players array
    this.players.push(player1)
    this.players.push(player2)

    // Set first player
    this.currentPlayer = player1 ;
  }

  updatePlayer() {

    // Update the current Player
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  }

  init() {

    // Initialize a board with all zeros

    // Initialize Empty 3x3 Board
    this.board = new Array(3);
    for (var i = 0; i < 3; i++) {
      this.board[i] = new Array(3);
    }

    // Fill empty board with 0
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
          this.board[i][j] = 0;
      }
    }
  }

  changeState(row, col) {

    // change the state of a specific box using its indices

    if (this.board[row][col] === 0) { // Place symbol if the box is already taken
      this.board[row][col] = this.currentPlayer.symbol

    } else { // Handle the case where a player clicks on a box that is already played

      console.log('this place is already taken')
    }

    // Checks if a player won
    if (this.check(row, col)) {

      // display message and update score
      console.log(this.currentPlayer.name + " WON!!") // change this to pop up that runs restart or reset
      this.currentPlayer.updateScore();
    } else {

      // Update player if game still going
      this.updatePlayer();
    }
  }

  check(row, col) {

    // check for row, col or diag win at a specific row and col after each turn.
    if (this.rowWin(row) || this.colWin(col) || this.diagWin(row, col)) {
      return true;
    }
    return false;
  }

  // OPTIMIZED VERSION: no need to check for the entire board, just check the row in which a symbol was just inserted
  rowWin(row) {

    // Checking for any row win

    // 2 for loops to iterate through all elements
    for (var j = 0; j < 2; j++) {

      // If an element contains a zero or two elements are not the same, break to check the next row
      if(this.board[row][j] === 0 || this.board[row][j] !== this.board[row][j+1]){
        break;
      }
      // If you compared the last two elements of the row and didn't break, return true
      if ( j === 1 ) {
        return true;
      }
    }

    // At this point, there is no row win
    return false;
  }

  // OPTIMIZED VERSION: no need to check for the entire board, just check the column in which a symbol was just inserted
  colWin(col) {

    // Checking for any row win

    // Same process as the rowWin.
    for (var i = 0; i < 2; i++) {
      if(this.board[i][col] === 0 || this.board[i][col] !== this.board[i+1][col]){
        break;
      }
      if ( i === 1 ) {
        return true;
      }
    }
    return false;
  }

  diagWin(row, col){

    // only get here after a move where i = j or i + j = 2 (major and minor diagonal)

    // check MAJOR diagonal (i === j), no need to keep track of j since i and j both get +1
    if( row === col ) {
      var i = 0;
      while (i < 2) {
        if(this.board[i][i] === 0 || this.board[i][i] !== this.board[i+1][i+1]){
          return false;
        }
        i++;
      }
      return true;
    }

    // check Minor diagonal (i + j === 2), when i decreases, j increases in the opposite way, need i and j going opposite ways
    if ( row + col === 2) {
      var i = 2;
      var j = 0;
      while (j < 2) {
        if(this.board[i][j] === 0 || this.board[i][j] !== this.board[i-1][j+1]){
          return false;
        }
        i--;
        j++;
      }
      return true;
    }
    // if provided with a row or column that doesn't concern the diagonal check, exit with false directly without checking
    return false;
  }

  replay() {

    // reset the board
    this.init();
  }

  reset() {

    // reset board, scores and brings back the current player to player 1
    this.init()
    this.currentPlayer = player1 ;
    this.players[0].score = 0;
    this.players[1].score = 0;
  }
}



// Function to execute when testing on console
var g = new Game();
var test = function() {
  g.init();
  g.addPlayers("heni","meher")
  console.table(g.board)
  g.changeState(0,0)
  console.table(g.board)
  console.log("row win : ", g.rowWin(0))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(0,0))
  console.log("WIN? : ", g.check(0,0))
  g.changeState(1,0)
  console.table(g.board)
  console.log("row win : ", g.rowWin(1))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(1,0))
  console.log("WIN? : ", g.check(1,0))
  g.changeState(1,1)
  console.table(g.board)
  console.log("row win : ", g.rowWin(1))
  console.log("col win : ", g.colWin(1))
  console.log("diag win : ", g.diagWin(1,1))
  console.log("WIN? : ", g.check(1,1))
  g.changeState(1,2)
  console.table(g.board)
  console.log("row win : ", g.rowWin(1))
  console.log("col win : ", g.colWin(2))
  console.log("diag win : ", g.diagWin(1,2))
  console.log("WIN? : ", g.check(1,2))
  g.changeState(0,2)
  console.table(g.board)
  console.log("row win : ", g.rowWin(0))
  console.log("col win : ", g.colWin(2))
  console.log("diag win : ", g.diagWin(0,2))
  console.log("WIN? : ", g.check(0,2))
  g.changeState(2,0)
  console.table(g.board)
  console.log("row win : ", g.rowWin(2))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(2,0))
  console.log("WIN? : ", g.check(2,0))
  g.changeState(2,2)
  console.table(g.board)
  console.log("row win : ", g.rowWin(2))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(2,2))
  console.log("WIN? : ", g.check(2,2))

  console.log(g.players[0].score)
  console.log(g.players[1].score)
  console.log(g.currentPlayer)
}

// invoke test
test();