
import { Component } from '@angular/core';
import { PartygameService } from './services/partygame.service';
import { Router } from '@angular/router';
import { LivechatService } from './services/livechat/livechat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'PartyGamesUI';
  userName = sessionStorage.getItem("userName");

  constructor(public _partyGameService:PartygameService, private router: Router,private livechatService: LivechatService){}

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

  home(){
    this.router.navigate(['/layout']);
  }

}
