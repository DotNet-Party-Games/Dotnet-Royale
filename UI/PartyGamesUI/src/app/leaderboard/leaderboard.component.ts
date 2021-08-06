import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Leader } from '../services/leader';
import { PartygameService } from '../services/partygame.service';
import { IScore } from '../services/score';
import { IUser } from '../services/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  gameId: number = 1;
  scores: IScore[];
  leaders: Leader[];

    constructor(private partyGameApi: PartygameService ) {}

  ngOnInit(): void {
    this.getLeaderBoardByGameId(this.gameId);
    console.log(this.scores);
  }

  getLeaderBoardByGameId(gameId: number)
  {
    this.partyGameApi.getTop10ScoresByGameId(gameId).subscribe((response: IScore[]) => { this.scores = response });
    this.scores.forEach((s) => {
      let p_username: string;
      let p_score: number = s.Score;
      this.partyGameApi.getUserByUserId(s.UserId).subscribe((response: IUser) => { p_username = response.UserName});
      let p_leader: Leader = new Leader(p_username, p_score);
      this.leaders.push();
    });
  }
}
