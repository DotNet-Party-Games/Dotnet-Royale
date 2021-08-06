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

  constructor(private partyGameApi: PartygameService )
  {
  }

  ngOnInit(): void {
    this. gameId = parseInt(sessionStorage.getItem('gameid'));
    this.getLeaderBoardByGameId(1);
  }

  //getLeaderBoardByGameId(p_gameId: number)
  //{
  //   this.partyGameApi.getTop10ScoresByGameId(p_gameId).subscribe((scores: IScore[]) => {
  //         scores.forEach(s =>{
  //           this.leaders.push({username: s.userId.toString(), score:s.score});

  //         });
  //   });
  // }


  getLeaderBoardByGameId(p_gameId: number)
  {
    this.partyGameApi.getTop10ScoresByGameId(p_gameId).subscribe((response: IScore[]) => {
      this.scores = response;
      this.scores.forEach(s => {
        this.partyGameApi.getUserFromUserId(s.userId).subscribe((u: IUser) => {
          console.log(s.userId)
          console.log(u.userName)
          this.leaders.push({username: u.userName, score:s.score});
          });
      })
    });
  }

}
