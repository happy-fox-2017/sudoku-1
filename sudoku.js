"use strict"

class Sudoku {
  constructor(board_string) {
    this.fullNumArray = "123456789".split("");
    this.game = this.arrangeBoard(board_string);
  }

this.arrangeBoard(str) {
  let regexDigit = /\d{9}/g;
  let arrayAwal = str.match(regexDigit);
  let boardFinal = [];
  for (let i = 0; i < arrayAwal.length; i++) {
      let Hor =[]
      for (let j=0; j < arrayAwal[i].length; j++){
        Hor.push(+this.arrayAwal[i][j]);
      }
      boardFinal.push(Hor);
    }
    return boardFinal;
  } 

 board() {
    let Line = "=====================";
    let allBoard = "";
    allBoard += Line +"\n" ;
    for (let i=0; i<this.game.length; i++) {
      for (let j=0; j<3; j++) {
        let correctNum = this.game[i].slice(j,j+3).join(" ");
           allBoard += correctNum;
        if (j!=2) {
          allBoard += " | " };
      }
      allBoard += "\n";
      if (i%3===0) {
        allBoard += Line + "\n"};
    }
    return allBoard;
  }

  // board clear

  check(Horizontal, Vertical, hitNum){
    let H=false, V=true, D=true;
    H = !this.game[Horizontal].includes(hitNum);
    for (let i=0; i<this.game.length; i++) {
      if (this.game[i][Vertical] == hitNum){
        V = false;
      }
    }
  }

  solve() {
    for (let i=0; i<this.game.length; i++) {
          console.log(this.board());
        for (let hitNum in this.fullNumArray) {
             if (this.check(i,j,this.fullNumArray[hitNum])) {
              this.game[i][j] = this.fullNumArray[hitNum];
              let gameEnd = this.solve();
              if (gameEnd === true) 
                {return true;
              this.game[i][j] = 0;
            }
          }
        } return false;
      }  return true;
    }
  
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var game = new Sudoku(005030081902850060600004050007402830349760005008300490150087002090000600026049503)

// Remember: this will just fill out what it can and not "guess"
game.solve()

//console.log(game.board())