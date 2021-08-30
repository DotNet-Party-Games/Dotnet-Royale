import { Component, OnInit } from '@angular/core';
import { ReservedOrUserEventNames } from 'socket.io-client/build/typed-events';
import { BlackjackService } from '../services/blackjack/blackjack.service';
import { IScore } from 'src/app/services/score';
import { PartygameService } from '../services/partygame.service';
import { ILoggedUser } from '../services/user';
import { Router } from '@angular/router';

// interface for individual player 
export interface Blackjack {
  name: string;
  player : any[]; // The player's current hand
  ppoints : number; // The player's current points
  pstand : boolean; // Player has stood
  winner: boolean; // denotes if player won or not
}

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  // dealer variables moved here
  deck: any[]; // overall deck for everyone
  dealer : any[]; // The dealer's current hand
  dpoints : number; // The dealer's current points
  safety : number = 17; // Computer will stand on or past this point
  dstand : boolean; // Dealer has stood
  dwinner: boolean; // Dealer wins game

  //cards
  dsymbols: any[] = ["♥", "♦", "♣", "♠"] // symbols for suits
  dnum: any = { 1 : "A", 11 : "J", 12 : "Q", 13 : "K" }; // Card numbers

  // keeps track if a game has started or not
  // manages visibility of buttons on html page
  gameStarted: boolean = false;

  // player array will be used when instantiating bjplayers
  players: string[] = ["Suraj", "Thomas", "Seunghoon", "Caleb"];
  // player objects will be placed here
  bjplayers: Blackjack[] = [];
  // will keep track of turns based on bjplayers array
  turn: number = 0;

  finalScore : IScore = {
    gamesId: null,
    userId: null,
    score: null,
  }

  public currentUser:ILoggedUser;
  constructor(private partyGameApi: PartygameService, private blackjackservice: BlackjackService, private router: Router) {
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

  ngAfterViewInit() {
    //this.sendBlackJackData(bj);
    // will handle room stuff
    this.selectGameRoomHandler();
    // initializes game
    this.readyPlayers();
  }

  public roomId: string;

  ngOnInit(): void {    
    this.selectGameRoomHandler();
  }

  selectGameRoomHandler(): void
  {
    this.roomId = '4';
    // will add every player to socket room
    for(let i = 0; i < this.players.length; i++) {
      this.join(this.players[i], this.roomId);
    }
  }

  join (username:string, roomId:string):void{
    // will send information to socket server via angular service
    this.blackjackservice.joinRoom({user:username, room:roomId});
  }

  sendBlackJackData(blackjack: Blackjack)
  {
    console.log(blackjack);
    //this.blackjackservice.sendBlackJackData({blackjack: bj});
  }

  goToRoom(){
    // change to reroute to blackjack room
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['blackjack']);
  }

  // array to declare objects based on users in room
  readyPlayers() {
    for(let i = 0; i < this.players.length; i++) {
      let bj = {
        name: this.players[i],
        player : [], // The player's current hand
        ppoints : 0, // The player's current points
        pstand : false, // Player has stood
        winner : false // if player won or not
      }
      // push player object to bjplayers array
      this.bjplayers.push(bj);
    }
  }

  // will be called when player presses start button
  start() {
    // game has now started for certain html tags
    this.gameStarted = true;
    // player 1 goes first (mind the 0 index)
    this.turn = 0;
    // deck array emptied to be repopulated
    this.deck = [];  
    // dealer hand set to empty
    this.dealer = [];  
    // dealer points set to zero
    this.dpoints = 0;  
    // hasnt gone, so dealer hasnt stood yet
    this.dstand = false;  

    // (C2) RESHUFFLE DECK
    // S: SHAPE (0 = HEART, 1 = DIAMOND, 2 = CLUB, 3 = SPADE)
    // N: NUMBER (1 = ACE, 2 TO 10 = AS-IT-IS, 11 = JACK, 12 = QUEEN, 13 = KING)
    for (let i=0; i<4; i++) { 
      for (let j=1; j<14; j++) {
        this.deck.push({s : i, n : j});
      }
    }

    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }

    // for players
    for(let i = 0; i < this.bjplayers.length; i++) {
      // player hand is set empty
      this.bjplayers[i].player = [];
      // player cant stand yet
      this.bjplayers[i].pstand = false;
      // player set to not winning initially
      this.bjplayers[i].winner = false;
      // draw first card
      this.draw(i);
      // console.log("Player " + i + " first card is " + 
      //               (this.dnum[this.bjplayers[i].player[0].n] ? 
      //                 this.dnum[this.bjplayers[i].player[0].n] : 
      //                 this.bjplayers[i].player[0].n
      //               ) 
      //               + this.dsymbols[this.bjplayers[i].player[0].s]
      //            );

      // draw second card
      this.draw(i);
      // calculate points
      this.points(i);
      // let winner = this.check(i);
      // if (winner==null) { 
      //   this.turn = 0; 
      // }
    }

    // for dealer
    // draw two cards
    this.draw(42);
    this.draw(42);
    // calculate dealer points
    this.points(42);
  }

  // (D) DRAW A CARD FROM THE DECK
  draw(i : number) {
    // pop card from deck
    let card = this.deck.pop();

    // set dealer index to arbitrary 42 number
    // dealer gets card pushed to hand array
    if(i == 42) {
      this.dealer.push(card);
    }

    // (D3) PLAYER'S CARD
    else {
      this.bjplayers[i].player.push(card);
    }
  }

  // when player or dealer hits
  hit(i : number) {
    // for dealer
    if(i == 42) {
      this.draw(i);
      this.points(42);
    }
    else {
      //(G1) DRAW A NEW CARD
      this.draw(i); 
      this.points(i);

      // if player points go over 21, auto stand
      if(this.bjplayers[i].ppoints > 21) {
        this.stand(i);
      }
      // same auto stand for 21
      else if(this.bjplayers[i].ppoints == 21) {
        this.stand(i);
      }
      // no else after previous two blocks, give stand option for user with button
    }
  }

  // when player or dealer stands
  stand(i: number) {
    // make stand variable true
    this.bjplayers[i].pstand = true;

    // if last player goes and game is still going, call dealer ai to finish game
    if(this.turn == this.bjplayers.length - 1) {
      while(this.gameStarted) {
        this.ai();
      }
    }
    // otherwise pass turn to next player
    else {
      this.turn++;
    }
  }

  // calculate dealer or player points
  points(j: number) {
    // (E1) RUN THROUGH CARDS
    // TAKE CARDS 1-10 AT FACE VALUE + J, Q, K AT 10 POINTS.
    // DON'T CALCULATE ACES YET, THEY CAN EITHER BE 1 OR 11.
    var aces = 0, points = 0;

    // calculate points based on aces in deck
    for (let i of (j == 42 ? this.dealer : this.bjplayers[j].player)) {
      if (i.n == 1) { aces++; }
      else if (i.n>=11 && i.n<=13) { points += 10; }
      else { points += i.n; }
    }

    // (E2) CALCULATIONS FOR ACES
    // NOTE: FOR MULTIPLE ACES, WE CALCULATE ALL POSSIBLE POINTS AND TAKE HIGHEST.
    if (aces!=0) {
      var minmax = [];
      for (let elevens=0; elevens<=aces; elevens++) {
        let calc = points + (elevens * 11) + (aces-elevens * 1);
        minmax.push(calc);
      }
      points = minmax[0];
      for (let i of minmax) {
        if (i > points && i <= 21) { points = i; }
      }
    }

    // (E3) UPDATE POINTS
    // update dealer points
    if (j == 42) { 
      this.dpoints = points; 
    }
    // add points to player points
    else {
      this.bjplayers[j].ppoints = points;
    }
  }

  // manages dealer choices at end of game
  ai() {
    // if dealer points are greater than or equal to 17
    if(this.dpoints >= this.safety) {
      // check function called to see who won
      this.check();
      // game set to false, so play button shows up on webpage
      this.gameStarted = false;
    }
    else {
      // otherwise, hit if below 17 for dealer
      this.hit(42);
    }
  }

  // checks for winners at end of game
  check() {
    // if dealer busts
    if(this.dpoints > 21) {
      for(let i = 0; i < this.bjplayers.length; i++) {
        // players who dont bust win
        if(this.bjplayers[i].ppoints <= 21) {
          this.bjplayers[i].winner = true;
        }
      }
    }
    // if dealer gets 21
    else if (this.dpoints == 21) {
      for(let i = 0; i < this.bjplayers.length; i++) {
        // players who get 21 still win
        if(this.bjplayers[i].ppoints == 21) {
          this.bjplayers[i].winner = true;
        }
      }
    }
    // if dealer has less than 21
    else {
      for(let i = 0; i < this.bjplayers.length; i++) {
        // if player has more than dealer and less than or equal to 21, they win
        if(this.bjplayers[i].ppoints > this.dpoints && this.bjplayers[i].ppoints <= 21) {
          this.bjplayers[i].winner = true;
        }
      }
    }
  }


}
