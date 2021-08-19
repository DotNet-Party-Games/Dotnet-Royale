import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  gameId: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.randomGameId();
  }

  goToLobby(){
    this.router.navigate(['/lobby']);
  }

  setGameId(p_gameId: number)
  {
    this.gameId = p_gameId;
  }

  randomGameId()
  {
    this.gameId = Math.floor(Math.random() * 3) + 1;
  }

  goToGame()
  {
    switch(this.gameId) {
      case 1: {
        this.router.navigate(['/snake']);
        break;
      }
      case 2: {
        this.router.navigate(['/blackjack'])
        break;
      }
      case 3: {
        this.router.navigate(['/tictactoe'])
        break;
      }
      default: {

      }
    }
  }

}
