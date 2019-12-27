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

    if (this.board[row][col] === 0) { // Place symbol if the box is already taken
      this.board[row][col] = symbol

    } else { // Handle the case where a player clicks on a box that is already played

      console.log('this place is already taken')
    }

  }

  check() {

  }

  rowWin() { // Checking for any row win

    // 2 for loops to iterate through all elements
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 2; j++) {

        // If an element contains a zero or two elements are not the same, break to check the next row
        if(this.board[i][j] === 0 || this.board[i][j] !== this.board[i][j+1]){
          break;
        }
        // If you compared the last two elements of the row and didn't break, return true
        if ( j === 1 ) {
          return true;
        }
      }
    }

    // At this point, there is no row win
    return false;
  }

  colWin() { // Checking for any row win

    // Same process as the rowWin. However, since we are moving along rows before going to the next column, we need to switch the order of the loops
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 2; i++) {
        if(this.board[i][j] === 0 || this.board[i][j] !== this.board[i+1][j]){
          break;
        }
        if ( i === 1 ) {
          return true;
        }
      }
    }
    return false;
  }

  diagWin(){

  }

  reset() {

  }
}



// Function to execute when testing on console
var test = function() {
  var g = new Game();
  g.init();
  console.table(g.board)
  console.log(g.colWin())
  g.changeState('X',0,0)
  console.table(g.board)
  console.log(g.colWin())
  g.changeState('X',1,0)
  console.table(g.board)
  console.log(g.colWin())
  g.changeState('X',1,1)
  console.table(g.board)
  console.log(g.colWin())
  g.changeState('X',1,2)
  console.table(g.board)
  console.log(g.colWin())
  g.changeState('X',0,2)
  console.table(g.board)
  console.log(g.colWin())
  g.changeState('X',2,0)
  console.table(g.board)
  console.log(g.colWin())
}

// invoke test
test();