"use strict"

class Sudoku {
  constructor(boardString) {
    this.parsedString = boardString.match(/\d{9}/g) || [];
    this.sudokuArray = this.makeArray();
    this.assignBoardStringToArray(this.sudokuArray, this.parsedString);
  }

  makeArray() {
    const sudokuArray = new Array(9);
    for (let i = 0; i < sudokuArray.length; i += 1) {
      sudokuArray[i] = new Array(9);
      sudokuArray[i].fill(0);
    }
    return sudokuArray;
  }

  assignBoardStringToArray(array, values) {
    for (let i = 0; i < array.length; i += 1) {
      const parsedSubString = values[i].split('');
      for (let j = 0; j < array.length; j += 1) {
        this.sudokuArray[i][j] = parsedSubString[j];
      }
    }
  }

  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    const lineStr = '-------------------------------\n';
    let boardAsString = lineStr;
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        boardAsString += `${this.sudokuArray[i][j]}  `;
        if ((j + 1) % 3 === 0 && (j < 8)) {
          boardAsString += '|  ';
        }
      }

      if ((i + 1) % 3 === 0) {
        boardAsString += `\n${lineStr}`;
      } else {
        boardAsString += '\n';
      }
    }
    return boardAsString;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())
