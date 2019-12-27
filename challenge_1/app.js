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

  init() {

    // Initialize Empty 3x3 Board
    this.board = new Array(3);
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(3);
    }

    // Fill empty board with 0
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
          this.board[i][j] = 0;
      }
    }
  }

  check() {

  }

  rowWin() {

  }

  colWin() {

  }

  diagWin(){

  }

  reset() {

  }
}