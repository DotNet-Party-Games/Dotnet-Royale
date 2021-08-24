import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IScore } from 'src/app/services/score';
import { PartygameService } from '../../services/partygame.service';
import { TicTacToeService } from 'src/app/services/TicTacToe/tic-tac-toe.service';
import { ILoggedUser } from 'src/app/services/user';
import { Subscriber } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { GameState } from 'src/app/services/TTTTGameState';
import { LivechatService } from 'src/app/services/livechat/livechat.service';

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
  gameState: GameState = {
    gameStarted: false,
    playerPieces: ["X", "O", "\u0444", "\u30B7", "\u02E0", "\u0376", "\u037C", "\u0394", "\u0398", "\u039B", "\u039E", "\u03A0", "\u03A8", "\u03A9", "\u00B5", "\u03A3", "\u0393", "\u0370"],
  };
  public roomId: string = sessionStorage.getItem('roomId');
  numOfPlayers: number = 4; // This will be obtained from socketio
  squareHeight: number = 100 / (this.numOfPlayers + 1); // is used to generate columns of relative size
  fontSize: number = 5 * 2 / (this.numOfPlayers); // is used to generate rows of relative size
  thisPlayer: number; // the player number of this specific player
  thisPlayerName: string; // the player name of this specific player
  num: number;
  index: number;
  audioUrl: string = "https://songsink.blob.core.windows.net/songs/"; //base url to access sounds

  


  constructor(private router: Router, private partyGameApi: PartygameService, private cd: ChangeDetectorRef,private livechatService: LivechatService) {
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
    this.thisPlayerName = sessionStorage.getItem('userName');
    
    this.livechatService.findPlayers().subscribe(data =>
      {
        console.log("In ngOninit subscription, data: ");
        console.log(data);
      });
    this.startup();
  }

  startup() {
    console.log("Entered startup method");

    // this.livechatService.getRoomList().subscribe(roomList => {
    //   let room = roomList.find(({id}) => id == this.roomId);
    //   console.log("room");
    //   console.log(room);
    //   console.log("room.users");
    //   console.log(room.users);
    //   this.gameState.playerList = room.users;
    // });

    // const subscription = this.tictactoeservice.currentPlayerList.subscribe(data => {
    //   console.log(data);
    //   this.gameState.playerList= data.users;
    
    // });
    console.log("called get players here: ")
    this.livechatService.getPlayers(({ room: this.roomId }));
    // this.tictactoeservice.findPlayers();
    console.log("Hopefully has players: ");
    console.log(this.gameState.playerList);

    //const subscription = this.tictactoeservice.currentPlayerList.subscribe(data => (this.gameState.playerList = data.map(a=>a)));
// this.tictactoeservice.findPlayers().subscribe(players => {
//       console.log("players");
//       console.log(players);
//       console.log("In observable2");
//       this.gameState.playerList = players;
//       // console.log("In observable3");
//       // this.numOfPlayers = this.gameState.playerList.length;
//       // console.log("In observable4");
//       // this.thisPlayer = this.gameState.playerList.indexOf(this.thisPlayerName);
//       // console.log("name: " + this.thisPlayerName);
//       // console.log("number: " + this.thisPlayer);
//       // console.log("All players");
//       // console.log(this.gameState.playerList);
//     });
    // this.tictactoeservice.getAudioTrigger().subscribe(audiotrigger => {
    //   this.playAudio(audiotrigger);
    // });
    // this.tictactoeservice.getTicTacToeData();
  }
  sendTicTacToeGamestate(currentGameState: GameState) {
    //console.log("Sending GameBoard Data");
    //this.tictactoeservice.sendTicTacToeData({ gameboard: currentGameState, room: this.roomId });
  }

  newGame() {
    let audio = <HTMLAudioElement>document.getElementById('audio');
    audio.pause();
    this.gameState.squares = new Array((this.numOfPlayers + 1) ** 2).fill(null);
    this.gameState.currentPlayer = 0;
    this.createGrid();
    this.generatePlayerPieces();
    this.gameState.winner = null;
    this.gameState.isOver = false;
    this.gameState.alreadyClicked = false;
    this.sendTicTacToeGamestate(this.gameState);
  }

  generatePlayerPieces() {
    let possiblePieces: any[];
    possiblePieces = ["X", "O", "\u0444", "\u30B7", "\u02E0", "\u0376", "\u037C", "\u0394", "\u0398", "\u039B", "\u039E", "\u03A0", "\u03A8", "\u03A9", "\u00B5", "\u03A3", "\u0393", "\u0370"];
    for (let i = possiblePieces.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [possiblePieces[i], possiblePieces[j]] = [possiblePieces[j], possiblePieces[i]];
    }
    this.gameState.playerPieces = new Array();
    for (let x = 0; x < this.numOfPlayers; x++) {
      if (x >= possiblePieces.length) {
        this.gameState.playerPieces.push(String(x));
      } else {
        this.gameState.playerPieces.push(possiblePieces[x]);
      }

    }
  }

  async makeMove(idx: number) {
    if (!this.gameState.squares[idx] && !this.gameState.isOver && !this.gameState.alreadyClicked && this.gameState.currentPlayer == this.thisPlayer) {
      this.gameState.alreadyClicked = true;

      this.gameState.squares[idx] = this.gameState.playerPieces[this.gameState.currentPlayer];
      this.updateGrid(idx, this.gameState.playerPieces[this.gameState.currentPlayer]);
     // this.tictactoeservice.sendAudioTrigger({ audioFile: "placepiecesound", room: this.roomId })
      this.gameState.winner = this.calculateWinner();
      this.endTurn();
    }
  }
  endTurn() {
    this.gameState.currentPlayer += 1;
    if (this.gameState.currentPlayer > this.numOfPlayers - 1) {
      this.gameState.currentPlayer = 0;
    }
    this.gameState.alreadyClicked = false;
    if (this.gameState.winner && this.gameState.winner == this.thisPlayerName) {
      this.gameState.isOver = true;
      this.playAudio("youwon");
    } else if (this.gameState.winner) {
      //this.tictactoeservice.sendAudioTrigger({ audioFile: "youlose", room: this.roomId })
    }
    this.sendTicTacToeGamestate(this.gameState);

  }

  createGrid() {

    this.gameState.grid = new Array(); //creating a new array
    let x = 0;
    while (x <= this.numOfPlayers) //this outer loop itereates the "rows"
    {
      let y = 0;
      let tempArr = new Array(); //Creates a blank "row"
      while (y <= this.numOfPlayers) {
        tempArr.push(null);  //this pushes a null entry to the current "row"
        y++
      }
      this.gameState.grid.push(tempArr); //pushes the filled "row" to the grid
      x++
    }
  }
  updateGrid(idx: number, piece: any) {
    let row = Math.floor(idx / (this.numOfPlayers + 1)); // integer division (sorta) to get row
    let col = idx % (this.numOfPlayers + 1); // remainder to specify column
    this.gameState.grid[row][col] = piece;
  }
  updateGameState(newGameState: GameState) {
    this.gameState = newGameState;
  }

  playAudio(audioCue: string) {
    let audio = <HTMLAudioElement>document.getElementById('audio');
    audio.volume = 0.1;
    audio.src = this.audioUrl + audioCue + ".mp3";
    if (audioCue == "youwon") {
      audio.loop = true;
    }
    audio.load();
    audio.play();
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
        if (this.gameState.grid[x][y]) {

          //check vertical when not next to the top or bottom edge
          if (x > 0 && x < this.numOfPlayers) {
            //check vertical
            if ((this.gameState.grid[x - 1][y] == this.gameState.grid[x][y]) && (this.gameState.grid[x][y] == this.gameState.grid[x + 1][y])) {
              return "Player " + this.gameState.playerPieces[this.gameState.currentPlayer];
            }
          }

          // check horizontal when not next to left or right edge
          if (y > 0 && y < this.numOfPlayers) {
            //check horizontal
            if ((this.gameState.grid[x][y - 1] == this.gameState.grid[x][y]) && (this.gameState.grid[x][y] == this.gameState.grid[x][y + 1])) {
              return "Player " + this.gameState.playerPieces[this.gameState.currentPlayer];
            }
          }
          //check if near corners
          if ((x > 0 && x < this.numOfPlayers) && (y > 0 && y < this.numOfPlayers)) {
            //check aigu diagonal
            if ((this.gameState.grid[x + 1][y - 1] == this.gameState.grid[x][y]) && (this.gameState.grid[x][y] == this.gameState.grid[x - 1][y + 1])) {
              return "Player " + this.gameState.playerPieces[this.gameState.currentPlayer];
            }

            //check grave diagonal
            if ((this.gameState.grid[x - 1][y - 1] == this.gameState.grid[x][y]) && (this.gameState.grid[x][y] == this.gameState.grid[x + 1][y + 1])) {
              return "Player " + this.gameState.playerPieces[this.gameState.currentPlayer];
            }
          }
        }
      }
    }
    let isCats: boolean = true;
    for (let x = 0; x < this.gameState.squares.length; x++) {
      if (!this.gameState.squares[x]) {
        if (!this.gameState.squares[x]) {
          isCats = false;
          return null;
        }
      }
      this.gameState.isOver = true;
      return "Cats Game! Nobody";
    }
  }
  goToRoom() {
    this.router.navigate(['/room']);
  }

}

