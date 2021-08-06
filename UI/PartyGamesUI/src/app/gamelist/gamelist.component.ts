import { Component, OnInit } from '@angular/core';
import { IGame } from '../services/game';
import { PartygameService } from '../services/partygame.service';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  games: IGame[];
  p_gameId: number;

  constructor(private partyGameApi: PartygameService ) {}

  ngOnInit(): void {
    this.getGameList();
    console.log(this.games);
  }

  getGameList()
  {
    this.partyGameApi.getGames().subscribe((response: IGame[]) => { this.games = response });
  }

  setGameId()
  {
    this.p_gameId = parseInt(document.getElementById("gameid").innerHTML);
  }
}
