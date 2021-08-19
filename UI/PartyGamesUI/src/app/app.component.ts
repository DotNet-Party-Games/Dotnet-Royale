
import { Component } from '@angular/core';
import { PartygameService } from './services/partygame.service';
import { Router } from '@angular/router';
import { LivechatService } from './services/livechat/livechat.service';
import { DataService } from './services/data.service';
import { IGame } from './services/game';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'PartyGamesUI';
  userName = sessionStorage.getItem("userName");
  games: IGame[];
  currentGameId: number;
  mainScreen: string;

  constructor(public _partyGameService:PartygameService, private router: Router, private livechatService: LivechatService, private data: DataService){}

  onLogout(){
    this.leave(this.userName,'1');
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userPassword");
    this.router.navigate(['/Login']);
  }

  leave(username:string, roomId:string):void
  {
    this.livechatService.leaveRoom({user:username, room:roomId});
  }

  main(){
    this.router.navigate(['/main']);
  }

  reset(){
    this.data.changeGameId(-1);
    this.router.navigate(['/layout']);
  }

  setGameId(p_gameId: number)
  {
    this.data.changeGameId(p_gameId);
  }

  showGame() {
    let p_game = this.games.find(g => g.id == this.currentGameId).name;
    this.mainScreen = p_game;
  }
}
