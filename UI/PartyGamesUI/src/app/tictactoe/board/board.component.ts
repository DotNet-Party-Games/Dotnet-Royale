import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IScore } from 'src/app/services/score';
import { PartygameService } from '../../services/partygame.service';
import { TicTacToeService } from 'src/app/services/TicTacToe/tic-tac-toe.service';
import { ILoggedUser } from 'src/app/services/user';
import { Subscriber } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  public currentUser:ILoggedUser;
  finalScore : IScore = {
    gamesId: null,
    userId: null,
    score: null,
  }
  count: number;
  myClonedArray : any[];
  squares: any[];
  xIsNext: boolean;
  winner: string;
  public roomId : string;

  constructor(private partyGameApi: PartygameService, private tictactoeservice : TicTacToeService, private cd:ChangeDetectorRef) {
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
    console.log("achieved");
    this.count = 0;

  }

  // ngOnChanges():void{
  //   this.sendTicTacToeGameboard(this.squares);
  //   this.getTicTacToeGameboard();
  // }
  
  selectGameRoomHandler(): void
  {
    this.roomId = '3';
    this.join(this.currentUser.userName, this.roomId);
  }
  join (username: string, roomId: string):void{
    this.tictactoeservice.joinRoom({user:username, room:roomId});
  }
  sendTicTacToeGameboard(squares: any[])
  {
    console.log("Sending GameBoard Data");
    this.tictactoeservice.sendTicTacToeData({gameboard : squares, room: this.roomId});
    
  }
  getTicTacToeGameboard()
  {
    console.log("Getting GameBoard Data");
    this.tictactoeservice.getTicTacToeData().subscribe(gameboard => {
      this.myClonedArray  = Object.assign([], gameboard.gameboard);
    });
    // console.log(this.myClonedArray);
  }
  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  

  async makeMove(idx: number) {
    this.getTicTacToeGameboard();
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.sendTicTacToeGameboard(this.squares);
    this.getTicTacToeGameboard();
    // console.log(this.squares);
    //this.squares = this.myClonedArray;
    console.log(this.squares);
    console.log(this.myClonedArray);
    //console.log(this.myClonedArray); 
    //this.squares = Object.assign([], this.myClonedArray);
    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.finalScore.userId = parseInt(sessionStorage.getItem('userId'));
        this.finalScore.gamesId = 3;
        this.finalScore.score = 1;
        this.partyGameApi.addscore(this.finalScore).subscribe();
       // This will be updateTictacToeStats this.partyGameApi.updateSnakeStats(this.finalScore).subscribe();
        return this.squares[a];
      }
    }
    return null;
  }
}

