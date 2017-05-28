"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.initBoard(board_string)
  }


  cekBaris(board, baris,kolom,nilai){
    //console.log('masuk cek baris');
    for(let i=0; i < 9; i++){
      if(board[i][kolom] === nilai){
        return false
      }
    }
    return true
  }

  cekKolom(board, baris, kolom, nilai){
    for(let i=0; i<9; i++){
      if(board[baris][i] === nilai){
        return false
      }
    }
    return true
  }

  cekKotak(board, baris, kolom, nilai){
    let mulaiBaris = baris-(baris%3)
    let mulaiKolom = kolom-(kolom%3)
    for (let i=0; i < 3; i++){
      for (let j=0; j < 3; j++){
        if(board[i+mulaiBaris][j+mulaiKolom] === nilai){
          return false
        }
      }
    }
    return true
  }


  ada(cell,baris, kolom, nilai){
    let board = this.board
    if(cell===0){ //cek empty
        if (this.cekBaris(board, baris, kolom, nilai) && this.cekKolom(board, baris, kolom, nilai) && this.cekKotak(board, baris, kolom, nilai)){
          return true
        }
        else{
          return false
        }
    }else {
    return false;
  }
}

  solve(board=this.board) {

    for(let i = 0; i < 9; i++){ //baris
      for (let j = 0; j < 9; j++){ //kolom
        for(let x=1; x<=9; x++){ //mengecek nilai 1-9
          if(this.ada(board[i][j],i,j,x)){
            board[i][j] = x
          }
        }
      }
    }
  this.board = board
  }

  // Returns a string representing the current state of the board
  initBoard(board_string) {
    let a=0 //initiate
    let board_arr = []
    for(let i=0; i<9; i++){
      board_arr.push([])
        for(let j=0; j<9; j++){
          board_arr[i].push(+board_string[a]) //looping index yang ga boleh sama dengan a, + = parseInt
          a++
        }
    }
    return board_arr
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string) //instantiate

// Remember: this will just fill out what it can and not "guess"
console.log(game.board)
console.log('\n');
game.solve()

console.log(game.board)
//console.log(game.empty);
