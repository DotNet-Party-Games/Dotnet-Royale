import { Component, Input, OnInit } from '@angular/core';
import { PartygameService } from '../services/partygame.service';
import { Leader } from '../services/leader';
import { IScore } from '../services/score';
import { IUser } from '../services/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  currentGameId: number;
  leaders: Leader[];
  scores: IScore[];

  constructor(private partyGameApi: PartygameService, private data: DataService) { }

  ngOnInit(): void {
    this.data.currentGameId.subscribe(p_gameId => {
        this.currentGameId = p_gameId;
        this.getLeaderBoardByGameId(this.currentGameId);
      });
  }

  getLeaderBoardByGameId(p_gameId: number)
  {
    this.leaders = [];
    this.partyGameApi.getTop10ScoresByGameId(p_gameId).subscribe((response: IScore[]) => {
      this.scores = response;
      this.scores.forEach(s => {
        this.partyGameApi.getUserFromUserId(s.userId).subscribe((u: IUser) => {
          this.leaders.push({username: u.userName, score:s.score});
          this.leaders.sort((a, b) => b.score - a.score)
          });
      })
    });
  }

}
