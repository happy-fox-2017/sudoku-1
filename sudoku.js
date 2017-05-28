"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string;
    this.unsolved = this.boardUnsolve();
    this.solved = this.solve();
  }

  boardUnsolve() {
    let board = [];
    let splitStr = this.str.split("");
      while(splitStr.length){
        board.push(splitStr.splice(0,9));
      }
    return board;
  }
  solve() {
    let solvedArray = [];

    for (let i = 0; i < this.unsolved.length; i++) {
      let arr = this.check(this.unsolved[i]);
      solvedArray.push(arr);
    }
    return solvedArray;
  }
  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < 9; i++) {
      this.unsolved[i].splice(3, 0, "|");
      this.unsolved[i].splice(7, 0, "|");
      this.unsolved[i] = this.unsolved[i].join(" ");

      this.solved[i].splice(3, 0, "|");
      this.solved[i].splice(7, 0, "|");
      this.solved[i] = this.solved[i].join(" ");
    }

    let line = [];
    for (let j = 0; j < 22; j++) {
      line.push("-");
    }
      line=line.join("");
        for (let k = 0; k < 16; k += 4) {
          this.unsolved.splice(k, 0, line);
          this.solved.splice(k, 0, line);
      }
      console.log("===Board  Unsolved===");
      console.log(game.unsolved.join("\n"));
      console.log("\n");
      console.log("===Board Solve===");
      console.log(game.solved.join("\n"));
  }

  check(arr) {

    let number = arr.join("");
    number = number.replace(/0/, this.replace(number));
    if (number.includes(0) === true) {
      return this.check(number.split(""));
    } else {
      return number.split("");
    }
  }

  replace(index) {
    for (let i = 1; i <= 9; i++) {
      if (index.includes(i) === false ) {
        return i;
      }
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

game.board();
