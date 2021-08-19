import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IScore } from 'src/app/services/score';
import { PartygameService } from '../../services/partygame.service';
import { TicTacToeService } from 'src/app/services/TicTacToe/tic-tac-toe.service';
import { ILoggedUser } from 'src/app/services/user';
import { Subscriber } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public currentUser: ILoggedUser;
  finalScore: IScore = {
    gamesId: null,
    userId: null,
    score: null,
  }
  isOver: boolean;
  myClonedArray: any[];
  squares: any[];
  grid: any[];
  xIsNext: boolean;
  winner: string;
  public roomId: string;
  numOfPlayers: number = 15; // This will be obtained from socketio
  squareHeight: number = 100 / (this.numOfPlayers + 1); // used to generate columns of relative size
  fontSize: number = 5 * 2 / (this.numOfPlayers); // used to generate rows of relative size
  currentPlayer: number;
  playerPieces: any[];
  num: number;
  index: number;
  OpponentMove: Boolean;
  alreadyClicked: Boolean;


  constructor(private router: Router, private partyGameApi: PartygameService, private tictactoeservice: TicTacToeService, private cd: ChangeDetectorRef) {
    this.currentUser =
    {
      id: 0,
      password: "",
      userName: ""
    }
    this.currentUser.id = parseInt(sessionStorage.getItem('userId'));
    this.currentUser.userName = sessionStorage.getItem('userName');
    this.currentUser.password = sessionStorage.getItem('userPassword');
  }

  ngOnInit(): void {
    this.newGame();
    this.selectGameRoomHandler();
    //console.log("achieved");
  }

  selectGameRoomHandler(): void {
    this.roomId = '3';
    this.join(this.currentUser.userName, this.roomId);
  }
  join(username: string, roomId: string): void {
    this.tictactoeservice.joinRoom({ user: username, room: roomId });
  }
  sendTicTacToeGameboard(squares: any[]) {
    //console.log("Sending GameBoard Data");
    this.tictactoeservice.sendTicTacToeData({ gameboard: squares, room: this.roomId });

  }
  getTicTacToeGameboard() {
    //console.log("Getting GameBoard Data");
    this.tictactoeservice.getTicTacToeData().subscribe(gameboard => {
      this.myClonedArray = Object.assign([], gameboard.gameboard);
    });
    // console.log(this.myClonedArray);
  }
  newGame() {
    this.squares = new Array((this.numOfPlayers + 1) ** 2).fill(null);
    this.currentPlayer=0;
    this.createGrid();
    this.generatePlayerPieces();
    this.winner = null;
    this.isOver = false;
    this.alreadyClicked = false;
  }
  generatePlayerPieces()
  {
    this.playerPieces = new Array();
     for(let x=0; x<this.numOfPlayers; x++)
     {
       this.playerPieces.push(String(x));
     }
     this.playerPieces[3] = "\u0444";
     this.playerPieces[2] = '\u30B7';
  }
  get player() {
    return this.xIsNext ? "\u0444" : '\u30B7';
  }


  async makeMove(idx: number) {
    if (!this.squares[idx] && this.isOver == false && this.alreadyClicked == false) {
      //this.AlreadyClicked = true;

      this.squares[idx] = this.playerPieces[this.currentPlayer];
      this.updateGrid(idx, this.playerPieces[this.currentPlayer]);
      this.winner = this.calculateWinner();
      this.endTurn();
    }
  }
  endTurn()
  {
    this.currentPlayer += 1;
    if(this.currentPlayer > this.numOfPlayers-1)
    {
      this.currentPlayer=0;
    }
    console.log(this.numOfPlayers);
    console.log(this.currentPlayer);
  }

  createGrid() {

    this.grid = new Array(); //creating a new array
    let x = 0;
    while (x <= this.numOfPlayers) //this outer loop itereates the "rows"
    {
      let y = 0;
      let tempArr = new Array(); //Creates a blank "row"
      while (y <= this.numOfPlayers) {
        tempArr.push(null);  //this pushes a null entry to the current "row"
        y++
      }
      this.grid.push(tempArr); //pushes the filled "row" to the grid
      x++
    }
  }
  updateGrid(idx: number, piece: any) {
    let row = Math.floor(idx / (this.numOfPlayers + 1)); // integer division (sorta) to get row
    let col = idx % (this.numOfPlayers + 1); // remainder to specify column
    this.grid[row][col] = piece;
  }
  calculateWinner() {
    //checks (x,1) for horizontal wins
    //checks (1,x) for vertical wins
    //start checking at (1,1) and check the 4 win orientations
    //then move to (1,2) until you hit (1,n-1) where n is the second to last column
    //then move down to (2,1) and repeat until (n-1,n-1)
    for (let x = 0; x <= this.numOfPlayers; x++) {
      for (let y = 0; y <= this.numOfPlayers; y++) {
        // if middle piece is null then we can skip the other checks
        if (this.grid[x][y]) {

          //check vertical when not next to the top or bottom edge
          if (x > 0 && x<this.numOfPlayers) {
            //check vertical
            if ((this.grid[x - 1][y] == this.grid[x][y]) && (this.grid[x][y] == this.grid[x + 1][y])) {
              return "Player " + this.playerPieces[this.currentPlayer];
            }
          }

          // check horizontal when not next to left or right edge
          if (y > 0 && y<this.numOfPlayers) {
            //check horizontal
            if ((this.grid[x][y - 1] == this.grid[x][y]) && (this.grid[x][y] == this.grid[x][y + 1])) {
              return "Player " + this.playerPieces[this.currentPlayer];
            }
          }
          //check if near corners
          if ((x > 0 && x < this.numOfPlayers) && (y > 0 && y < this.numOfPlayers)) {
            //check aigu diagonal
            if ((this.grid[x + 1][y - 1] == this.grid[x][y]) && (this.grid[x][y] == this.grid[x - 1][y + 1])) {
              return "Player " + this.playerPieces[this.currentPlayer];
            }

            //check grave diagonal
            if ((this.grid[x - 1][y - 1] == this.grid[x][y]) && (this.grid[x][y] == this.grid[x + 1][y + 1])) {
              return "Player " + this.playerPieces[this.currentPlayer];
            }
          }
        }
      }
    }
    //     this.finalScore.userId = parseInt(sessionStorage.getItem('userId'));
    //     this.finalScore.gamesId = 3;
    //     this.finalScore.score = 1;
    //     this.partyGameApi.addscore(this.finalScore).subscribe();
    //     // This will be updateTictacToeStats this.partyGameApi.updateSnakeStats(this.finalScore).subscribe();
    //     this.isOver = true;
    let isCats: boolean = true;
    for (let x = 0; x < this.squares.length; x++) {
      if (!this.squares[x]) {
        isCats = false;
        return null;
      }
    }
    this.isOver = true;
    return "Cats Game! Nobody";
  }

  goToRoom(){
    this.router.navigate(['/room']);
  }
}

