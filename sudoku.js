"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.initiate(board_string);
    this.empty = this.listEmpty();
  }

  initiate(board_string) {
    let arr = [];
    for(let i=0, k=0; i<9; i++) {
      arr.push([]);
      for(let j=0; j<9; j++, k++) {
        arr[i].push(parseInt(board_string[k]));
      }
    }
    return arr;
  }

  listEmpty() {
    let arr = [];
    for(let i=0; i<9; i++) {
      for(let j=0; j<9; j++) {
        if(this.board[i][j] == 0) {
          let obj = {
            row: i,
            col: j
          }
          arr.push(obj);
        }
      }
    }
    return arr;
  }

  checkRow(row, value) {
    for(let i = 0; i < 9; i++) {
      if(value == this.board[row][i]) {
        return false;
      }
    }
    return true;
  }

  checkColumn(column, value) {
    for(let i = 0; i < 9; i++) {
      if(value == this.board[i][column]) {
        return false;
      }
    }
    return true;
  }

  checkSquare(row, col, value) {
    let rowStart = Math.floor(row/3)*3;
    let colStart = Math.floor(col/3)*3;
    for (let i=rowStart; i<rowStart+3; i++) {
      for (let j=colStart; j<rowStart+3; j++) {
        if (value == this.board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  checkValue(row, col, value) {
    if (this.checkRow(row, value) && this.checkColumn(col, value) && this.checkSquare(row, col, value)) {
      return true;
    }
    return false;
  }

  solve() {
    for (let i = 0 ; i < 9 ; i++){
      for (let j = 0 ; j< 9 ; j++){
        for (let k = 1 ; k <= 9 ; k++){
          if(this.checkValue(i,j,k)){
            this.board[i][j] = k;
          }
        }

      }
    }
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
console.log(game.board)
console.log('\n')
game.solve()
console.log(game.board)

// console.log(game.board);
// console.log(game.listEmpty());
// console.log(game.checkRow(1,9));
// console.log(game.checkRow(1,3));
// console.log(game.checkSquare(8,0,0));
