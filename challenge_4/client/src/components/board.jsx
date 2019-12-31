import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.playBoard = this.initBoard()
    console.log(this.playBoard)
    this.player1 = {color: 'yellow', name: 'player 1', score: 0, number: 1}
    this.player2 = {color: 'red', name: 'player 2', score: 0, number: 2}
    this.currentPlayer = this.player1;
  }

  initBoard() {
    var board = []
    for (var i = 0; i < 6 ; i++) {
      var tmpArr = []
      for (var j = 0; j < 7; j++) {
        tmpArr.push(0);
      }
      board.push(tmpArr);
    }
    return board;
  }

  initGame() {
    this.playBoard = this.initBoard();
    for (var i = 5; i >= 0; i--) {
      for (var j = 6; j >= 0; j--) {
        $(`#${i.toString() + j.toString()}`).css('background-color', "white")
      }
    }
  }

  addValue(col) {
    var canAdd = false;
    for (var i = this.playBoard.length - 1; i >= 0; i--) {
      if (this.playBoard[i][col] === 0) {
          this.playBoard[i][col] = this.currentPlayer.number;
          canAdd = true;
          $(`#${i.toString() + col.toString()}`).css('background-color', this.currentPlayer.color)
          if (this.hasWon(i,col)) {
            this.currentPlayer.score++;
            alert(this.currentPlayer.name + " won, his score is " + this.currentPlayer.score)
            this.initGame()
          }
          this.updatePlayer()
          break;
      }
    }
    if (!canAdd) {
        alert("column full");
    }
  }

  hasWon(row, col) {
    var plus = [1, 2, 3];
    var zero = [0, 0, 0];
    var minus = [-1, -2, -3];
    var iterations = {
      i: [plus, plus, zero, minus, minus, minus, zero, plus],
      j: [zero, minus, minus, minus, zero, plus, plus, plus]
    }
    for (var k = 0; k < 8; k++) {
      var boo = true;

      var iIndexes = iterations.i[k].map(x => x + row);
      var jIndexes = iterations.j[k].map(x => x + col);

      for (var l = 0; l < iIndexes.length; l++) {
        if ((iIndexes[l] < 0) || (jIndexes[l] < 0) || (iIndexes[l] >= this.playBoard.length) || (jIndexes >= this.playBoard[row].length)) {
          boo = false;
        }
      }

      if (boo && (this.playBoard[row][col] === this.playBoard[iIndexes[0]][jIndexes[0]]) && (this.playBoard[row][col] === this.playBoard[iIndexes[1]][jIndexes[1]]) && (this.playBoard[row][col] === this.playBoard[iIndexes[2]][jIndexes[2]])) {
          if (this.playBoard[row][col] !== 0) {
            return true
          }
      }

    }
    return false;
  }

  updatePlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  render() {
    return (
      <div className="board">
        {
          this.playBoard.map((rows, i) => (
            rows.map((col, j) => (
              <div className="box" id={(i).toString()+j.toString()} onClick={this.addValue.bind(this, j)}></div>
            ))
          ))
        }
      </div>
    )
  }
}


export default Board;