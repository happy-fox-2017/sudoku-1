"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.boardMake(board_string)
  }

  // 1. Make the board
  // Returns a string representing the current state of the board
  boardMake(board_string) { // v for values, b for baris, k for kolom
    let arrBoard = [];
    for (let a = 0, i = 0; i < 9; i++) {
      arrBoard.push([]);
      for (let j = 0; j < 9; j++, a++) {
        arrBoard[i].push(+board_string[a]);
      }
    }
    return arrBoard;
  }


// 2. Cek value
checkValue(cell, baris, kolom, value) {
  let board = this.board;
  if (cell === 0) {
    if (this.checkRow(board, baris, kolom, value) && this.checkColumn(board, baris, kolom, value) && this.checkSquare(board, baris, kolom, value)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  } //if
}


//3. Cek baris
checkRow(board, baris, kolom, value) {
  for (let r = 0; r < 9; r++) {
    if (board[r][kolom] === value) {
      return false;
    }
  }
  return true;
}

//3. Cek kolom
checkColumn(board, baris, kolom, value) {
  for (let c = 0; c < 9; c++) {
    if (board[baris][c] === value) {
      return false;
    }
  }
  return true;
}

//4. Cek kotak 3x3
checkSquare(board, baris, kolom, value) {
  let rowStart = baris - (baris % 3); //
  let columnStart = kolom - (kolom % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + rowStart][j + columnStart] === value) {
        return false;
      }
    }
  }
  return true;
} //method

//5. Cek solusi
solve(board = this.board) {
  for (let b = 0; b < 9; b++) { //baris
    for (let k = 0; k < 9; k++) { //kolom
      for (let v = 0; v <= 9; v++) {
        if (this.checkValue(board[b][k], b, k, v)) {
          board[b][k] = v;
        }
      }
    }
  }
  this.board = board;
}

} //class

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.board);
console.log('\n');
game.solve()
//
console.log(game.board);

// console.log(game.boardMake(board_string));
