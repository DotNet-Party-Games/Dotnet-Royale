import { Component, Input, OnInit } from '@angular/core';
import { PartygameService } from '../services/partygame.service';
import { Leader } from '../services/leader';
import { IScore } from '../services/score';
import { IUser } from '../services/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  gameId: number;
  leaders: Leader[] = [];
  scores: IScore[];

  constructor(private partyGameApi: PartygameService ) {}

  ngOnInit(): void {
    this.gameId = parseInt(sessionStorage.getItem('gameid'));
    this.getLeaderBoardByGameId(this.gameId);
//    this.partyGameApi.getTop10ScoresByGameId(this.gameId).subscribe((response: IScore[]) => {this.scores = response });
  }

  getLeaderBoardByGameId(p_gameId: number)
  {
    this.partyGameApi.getTop10ScoresByGameId(p_gameId).subscribe((response: IScore[]) => {
      this.scores = response;
      let p_username: string = "";
      this.scores.forEach(s => {
        this.partyGameApi.getUserFromUserId(s.userId).subscribe((user: IUser) => {
          console.log(s.userId)
          console.log(user.username)
          p_username = user.username;
        });
        console.log(p_username + s.score);
        this.leaders.push({username: p_username, score:s.score});
      })
    });
  }

}
