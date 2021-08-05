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

    constructor(private partyGameApi: PartygameService ) {
      this.games = [
        {
          id:  1,
          name: "Game 1",
          description: "Description 1"
        },
        {
          id:  2,
          name: "Game 2",
          description: "Description 2"
        },
        {
          id:  3,
          name: "Game 3",
          description: "Description 3"
        }
      ]
     }

  ngOnInit(): void {
    this.getGameList();
    console.log(this.games);
  }

  getGameList()
  {
    this.partyGameApi.getGames().subscribe((response: IGame[]) => { this.games = response });
  }
}
