"use strict"

class Sudoku {
  constructor(board_string) {
    this.arr = board_string.match(/\d{9}/g)
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    const horLine = '---------------------\n';
    let arr = this.arr;
    let sudoString = horLine;

    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        if (col + 1 === 9) {
          sudoString += `${arr[row][col]}`;
        } else if (((col + 1) % 3 === 0 ) && (col < 8)) {
          sudoString += `${arr[row][col]} | `;
        } else {
          sudoString += `${arr[row][col]} `;
        }
      }

      if ((row + 1) % 3 === 0) {
        sudoString += `\n${horLine}`;
      } else {
        sudoString += '\n';
      }
    }

    return sudoString;
  }

}  // --------------- end of line ---------------

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

// console.log(game.arr);

game.solve()
console.log(game.board())
