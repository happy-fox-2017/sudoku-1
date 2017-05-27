"use strict"

class Sudoku {
  constructor(board_string) {
    this.firstBoard = this.sudokuArray(board_string);
    this.sudokuArray = this.sudokuArray(board_string);
    this.sudokuZeroIndex = this.getZeroIndex();
    this.sudokuGuess = "123456789".split("");
  }

  // return 2D array of sudoku
  sudokuArray(sudokuStr) {
    // Make 2D array from string
    let regx = /\d{9}/g;
    let arr = sudokuStr.match(regx)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("")
    }
    return arr;

  }

  // return array of zero index
  getZeroIndex() {
    // make 2D array of index values of zero
    let indexArr = []
    for (let i = 0; i < this.sudokuArray.length; i++) {
      for (let j = 0; j < this.sudokuArray.length; j++) {
        let tempIndex = [];
        if (this.sudokuArray[i][j] == 0) {
          tempIndex.push(i);
          tempIndex.push(j);
          indexArr.push(tempIndex);
        }
      }
    }
    return indexArr;
  }

  // return horizontal array of checked value
  horizontalArr(row) {
    let horizontalArr = [];
    for (let i = 0; i < this.sudokuArray.length; i++) {
      horizontalArr.push(this.sudokuArray[row][i]);
    }
    return horizontalArr;
  }

  //return vertical array of checked value
  verticalArr(column) {
    let vertikalArr = [];
    for (let i = 0; i < this.sudokuArray.length; i++) {
      vertikalArr.push(this.sudokuArray[i][column]);
    }
    return vertikalArr;
  }

  // return box array of checked value
  boxArr(x, y) {
    let boxCheckArr = [];
    let borderBox = this.boxGroup(x, y);
    let xMin = borderBox[0], xMax = borderBox[1];
    let yMin = borderBox[2], yMax = borderBox[3];
    for (let i = xMin; i < xMax; i++) {
      for (let j = yMin; j < yMax; j++) {
        boxCheckArr.push(this.sudokuArray[i][j]);
      }
    }
    return boxCheckArr;
  }

  // return box's border index [Xmin, Xmax, Ymin, Ymax]
  boxGroup(row, column) {
    let grid;
    for (let r = 3; r <= 9; r+= 3) {
      for (let c = 3; c <= 9 ; c+= 3) {
        if (row < r && column < c) {
          grid = [r-3, r, c-3, c]
          return grid
        }
      }
    }
  }

  // >> loop based on sudokuZeros.length
  // 1. make a guess array. >> array from [1,...,9]
  // 2. get the index of zero >> get the x and y coodinate
  // 3. check the index of vertikalArr, horizontalArr, and boxArr of checked zero koordinate
  //    compare it with guess array >> -1 or not
  // 4. if true, it means the guessArrays value not founded yet, >> go to step 6
  // 5. if false, guessArray value is already there, continue
  // 6. update the value of sudokuArray from zeroArray's coodinated with guessArray.
  // 7. back to first step, until the loop complete
  // 8. display the solved board.

  // return to update this.sudokuArray

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  reset_board() {
    console.log("\x1B[2J")
  }

  solve() {
    for (let i = 0; i < this.sudokuZeroIndex.length; i++) {
      let xZero = this.sudokuZeroIndex[i][0];
      let yZero = this.sudokuZeroIndex[i][1];
      let rowArr = this.horizontalArr(xZero);
      let columnArr = this.verticalArr(yZero);
      let boxArr = this.boxArr(xZero, yZero);
      for (let j = 0; j < this.sudokuGuess.length; j++) {
        if (!rowArr.includes(this.sudokuGuess[j]) && !columnArr.includes(this.sudokuGuess[j]) && !boxArr.includes(this.sudokuGuess[j])) {
          this.sudokuArray[xZero][yZero] = this.sudokuGuess[j];
          this.reset_board()
          console.log(this.sudokuArray);
          this.sleep(500)
          break;
        } else {
          // this.sudokuArray[xZero][yZero] = (Math.floor(Math.random() * 9) + 1).toString()
          // console.log('--');
          continue;
        }
      }
    }
    return this.sudokuArray;
  }

  // Returns a string representing the current state of the board
  solvedBoard() {
    return this.sudokuArray;
  }

  unsolvedBoard() {
    return this.firstBoard;
  }
}

// TEST !
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[0]

var game = new Sudoku(board_string)
console.log("=================== Unsolved Board ===================");
console.log(game.unsolvedBoard());
console.log("\n");
console.log("=================== Solved Board =====================");
game.solve();
console.log('____________________FINISHED___________________________');
console.log('\n');
console.log(game.solvedBoard());


//

// Remember: this will just fill out what it can and not "guess"
// game.solve()
//
// console.log(game.board())
