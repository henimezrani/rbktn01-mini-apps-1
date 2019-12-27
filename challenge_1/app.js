class Player {
  constructor(name, score, symbol) {
    this.name = name;
    this.score = score;
    this.symbol = symbol
  }

  playMove() {

  }
}

class Game {
  constructor() {
    this.board = []
    this.players = []
    this.gamesCount = []
  }

  init() { // Initialize a board with all zeros

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

  changeState(symbol, row, col) { // change the state of a specific box using its indices

    console.log("adding at [" + row + ", " + col + " ]")

    if (this.board[row][col] === 0) { // Place symbol if the box is already taken
      this.board[row][col] = symbol

    } else { // Handle the case where a player clicks on a box that is already played

      console.log('this place is already taken')
    }

  }

  check() {

  }

  // OPTIMIZED VERSION: no need to check for the entire board, just check the row in which a symbol was just inserted
  rowWin(row) { // Checking for any row win

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
  colWin(col) { // Checking for any row win

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

  diagWin(row, col){ // only get here after a move where i = j or i + j = 2 (major and minor diagonal)

    if( row === col ) { // check MAJOR diagonal (i === j), no need to keep track of j since i and j both get +1
      var i = 0;
      while (i < 2) {
        if(this.board[i][i] === 0 || this.board[i][i] !== this.board[i+1][i+1]){
          return false;
        }
        i++;
      }
      return true;
    }

    if ( row + col === 2) { // check Minor diagonal (i + j === 2), when i decreases, j increases in the opposite way, need i and j going opposite ways
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

    return false;
  }

  reset() {

  }
}



// Function to execute when testing on console

var test = function() {
  var g = new Game();
  g.init();
  console.table(g.board)
  g.changeState('X',0,0)
  console.table(g.board)
  console.log("row win : ", g.rowWin(0))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(0,0))
  g.changeState('X',1,0)
  console.table(g.board)
  console.log("row win : ", g.rowWin(1))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(1,0))
  g.changeState('X',1,1)
  console.table(g.board)
  console.log("row win : ", g.rowWin(1))
  console.log("col win : ", g.colWin(1))
  console.log("diag win : ", g.diagWin(1,1))
  g.changeState('X',1,2)
  console.table(g.board)
  console.log("row win : ", g.rowWin(1))
  console.log("col win : ", g.colWin(2))
  console.log("diag win : ", g.diagWin(1,2))
  g.changeState('X',0,2)
  console.table(g.board)
  console.log("row win : ", g.rowWin(0))
  console.log("col win : ", g.colWin(2))
  console.log("diag win : ", g.diagWin(0,2))
  g.changeState('X',2,0)
  console.table(g.board)
  console.log("row win : ", g.rowWin(2))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(2,0))
  g.changeState('X',2,2)
  console.table(g.board)
  console.log("row win : ", g.rowWin(2))
  console.log("col win : ", g.colWin(0))
  console.log("diag win : ", g.diagWin(2,2))
}

// invoke test
test();