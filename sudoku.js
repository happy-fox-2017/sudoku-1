"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardLength = 9;
    this.content = this.pickValueSet(board_string);
  }

  pickValueSet(str) {
   let matrix = [];
   for (let i = 0, ValueSet = 0; i < this.boardLength; i++) {
     matrix.push([]);
     for (let j = 0; j < this.boardLength; j++, ValueSet++) {
       if (str[ValueSet] != undefined) {
         matrix[i].push(parseInt(str[ValueSet]));
       }else {
         matrix[i].push(0);
       }
     }
   }
   return matrix;
  }

  checkValueInColumn(value, i, j) {
    // balikin true kalo gak ada value yang sama pada kolom yg sama
    for (let k = 0; k < this.boardLength; k++) {
      if (value == this.content[k][j]) {
        return false;
      }
    }
    return true;
  }

  checkValueInRow(value, i, j) {
    // balikin true kalo gak ada value yang sama pada baris yg sama
    for (let k = 0; k < this.boardLength; k++) {
      if (value == this.content[i][k]) {
        return false;
      }
    }
    return true;
  }

  checkValueInBlock(value, i, j) {
    // balikin true kalo gak ada value yang sama pada blok yang sama
    let columnStart = Math.floor(j / 3) * 3;
    let rowStart = Math.floor(i / 3) * 3;
    for (let k = rowStart; k < Math.sqrt(this.boardLength) + rowStart; k++) {
      for (let l = columnStart; l < Math.sqrt(this.boardLength) + columnStart; l++) {
        if (value == this.content[k][l]) {
          return false;
        }
      }
    }
    return true;
   }

  solve() { // note: pas solve masih ada aja angka yang 0
    for (let i = 0; i < this.boardLength; i++) {
      for (let j = 0; j < this.boardLength; j++) {
        // Cek jika value bernilai 0
        if (this.content[i][j] == 0) {
          // Proses pengisian
          // Cek 3 kondisi method terpenuhi
          for (let k = 1; k < 10; k++) {
            if (this.checkValueInRow(k, i, j) && this.checkValueInColumn(k, i, j) && this.checkValueInBlock(k, i, j)) {
              this.content[i][j] = k;
              break;
            }
          }

        }
      }
    }
    return this;
  }

  // Returns a string representing the current state of the board
  board() {
    let str = "---------------------\n";
    for (let i = 0; i < this.boardLength; i++) {
      for (let j = 0; j < this.boardLength; j++) {
        if (j == this.boardLength-1) {
          str += this.content[i][j];
        } else if (j == 2 || j == 5) {
          str += this.content[i][j] + " | ";
        } else {
          str += this.content[i][j] + " ";
        }
      }

      if (i == 2 | i == 5 | i == 8) {
        str += "\n---------------------\n";
      } else {
        str += "\n";
      }
    }
    return str;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"

console.log("before solved");
console.log(game.board());
game.solve();
console.log("solved");
console.log(game.board());
