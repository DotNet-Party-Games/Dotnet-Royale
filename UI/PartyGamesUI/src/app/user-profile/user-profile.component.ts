import { Component, OnInit } from '@angular/core';
import { PartygameService } from '../services/partygame.service';
import { IGame } from '../services/game';
import { IUserScore } from '../services/userscore';
import { IGameStats } from '../services/gamestats';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId: number;
  userName: string;
  games: IGame[];
  userscores: IUserScore[];
  scores: {gameName: string, score: number}[];

  snakeGameStats: IGameStats;
  blackJackGameStats: IGameStats;

  constructor(private partyGameApi: PartygameService) { }

  ngOnInit(): void {
    this.userId = parseInt(sessionStorage.getItem("userId"));
    this.userName = sessionStorage.getItem("userName");

    // this.getGameList();
    // this.GetUserScoreHistory();

    this.partyGameApi.getSnakeGameStatsByUserId(this.userId)
      .subscribe((response: IGameStats) => {this.snakeGameStats = response});
    this.partyGameApi.getBlackJackGameStatsByUserId(this.userId)
      .subscribe((response: IGameStats) => {this.blackJackGameStats = response});

  }

  getGameList()
  {
    this.partyGameApi.getGames().subscribe((response: IGame[]) => { this.games = response });
  }

  GetUserScoreHistory()
  {
    this.partyGameApi.getScoreHistoryByUserId(this.userId).subscribe((response: IUserScore[]) => {
      this.userscores = response;
      this.userscores.sort((a, b) => b.score - a.score);
    });
  }

  GetUserScoreHistoryByGameId(p_gameId)
  {
    this.partyGameApi.getScoreHistoryByUserId(this.userId).subscribe((response: IUserScore[]) => {
      this.userscores = response;
      this.userscores.filter(u => { u.gamesId == p_gameId})
      this.userscores.sort((a, b) => b.score - a.score);
      // this.scores = [];
      // this.userscores.forEach((u: IUserScore) => {
      //   let index = this.games.indexOf(p_gameId);
      //   this.scores.push({this.games[index].name ,  u.score});
      //})
    });
  }

}
