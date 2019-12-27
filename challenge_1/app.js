class Player {
  constructor(name, score, symbol) {
    this.name = name;
    this.score = score;
    this.symbol = symbol;
  }

  updateScore() {

    // Updates the player's score
    this.score++;
  }

  resetScore() {

    // Reset score to zero
    this.score = 0;
  }

  playerStatsTemplate() {

    var statsDiv = document.createElement("DIV");
    statsDiv.id = this.symbol;
    statsDiv.classList.add('playerBox');
    var nameDiv = document.createElement("H2");
    var scoreDiv = document.createElement("H3");
    nameDiv.id = this.name;
    nameDiv.innerHTML = this.name
    scoreDiv.id = this.name + "-score";
    scoreDiv.innerHTML = this.score
    statsDiv.appendChild(nameDiv);
    statsDiv.appendChild(scoreDiv);

    return statsDiv
  }

  updateStatsOnWin() {
    document.getElementById(this.name + "-score").innerHTML = this.score;
  }
}

class Game {
  constructor() {
    this.board = [];
    this.players = [];
    this.movesCount = 0;
    this.currentPlayer;
    this.init();
    this.addPlayers();
  }

  incMoves() {
    this.movesCount++;
  }

  resetMoves() {
    this.movesCount = 0;
  }

  addPlayers(/*name1, name2*/) {

    var name1 = prompt("First player's name"); // TEMPORARY
    var name2 = prompt("Second player's name"); // TEMPORARY

    // Create 2 player instances
    var player1 = new Player(name1, 0, "X");
    var player2 = new Player(name2, 0, "O");

    // Push players to the players array
    this.players.push(player1);
    this.players.push(player2);

    // Set first player
    this.currentPlayer = player1;

    // Render Generated players
    document.getElementById('playerStats').appendChild(player1.playerStatsTemplate())
    document.getElementById('playerStats').appendChild(player2.playerStatsTemplate())
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

    // clear DOM images
    var boxes = document.getElementsByClassName("col");
    for (var i = 0 ; i < boxes.length ; i++) {
      boxes[i].innerHTML = "";
    }
  }

  changeState(event) {

    // Detect Row and Column of the clicked box
    var row = parseInt(event.target.id.charAt(1),10);
    var col = parseInt(event.target.id.charAt(3),10);

    // change the state of a specific box using its indices
    if (!Number.isNaN(row)) {
      console.log(row)
      console.log(col)

      // Place symbol if the box is already taken
      this.board[row][col] = this.currentPlayer.symbol

      // Place the image
      var imgDiv = document.createElement("IMG");
      imgDiv.src = './assets/' + this.currentPlayer.symbol + '.png';
      event.target.appendChild(imgDiv)

      // Increment the number of moves
      this.incMoves();

      // Handle wins, draws and continuations
      if (this.check(row, col)) { // check if player won

        // display message and update score
        alert(this.currentPlayer.name + " WON!!")
        this.replay()// change this to pop up that runs restart or reset LISTEN TEMPORARY
        this.currentPlayer.updateScore();
        this.currentPlayer.updateStatsOnWin()

      } else if (this.movesCount === 9) { // Handle Draws
        alert("draw")// change this to pop up that runs restart or reset LISTEN TEMPORARY
        this.replay();

      } else { // continuation

        // Update player if game still going
        this.updatePlayer();
      }

    // Handle the case where a player clicks on a box that is already played
    } else {
      console.log('this place is already taken')
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

    if (row === col || (row + col) === 2) { // refactored to handle middle case since it applies to both

      // check MAJOR diagonal (i === j), no need to keep track of j since i and j both get +1
      if( row === col ) {
        var check = true;
        var i = 0;
        while (i < 2) {
          if(this.board[i][i] === 0 || this.board[i][i] !== this.board[i+1][i+1]){
            check = false;
            break;
          }
          i++;
        }
        if (check) {
          return true;
        }
      }


      // check Minor diagonal (i + j === 2), when i decreases, j increases in the opposite way, need i and j going opposite ways
      if ( (row + col) === 2) {
        var check = true;
        var i = 2;
        var j = 0;
        while (j < 2) {
          if(this.board[i][j] === 0 || this.board[i][j] !== this.board[i-1][j+1]){
            check = false;
          }
          i--;
          j++;
        }
      }
      if (check) {
        return true;
      }
    }

    // if provided with a row or column that doesn't concern the diagonal check, exit with false directly without checking
    return false;
  }

  replay() {
    // reset the board
    this.init();
    this.resetMoves();
  }

  reset() {

    // reset board, scores and brings back the current player to player 1
    this.replay()
    this.currentPlayer = player1 ;
    this.players[0].resetScore();
    this.players[1].resetScore();
  }
}

/****************************************************************************************************/

// GAME START button

var game = new Game();
var boxes = document.getElementsByClassName("col");
for (var i = 0 ; i < boxes.length ; i++) {
  boxes[i].addEventListener("click", (e) => game.changeState(e));
}