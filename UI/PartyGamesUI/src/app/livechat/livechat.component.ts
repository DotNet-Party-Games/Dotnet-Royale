import { IGame } from '../services/game';
import { LivechatService } from '../services/livechat/livechat.service';
import { PartygameService } from '../services/partygame.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILoggedUser } from '../services/user';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {

  public roomId : string;
  public messageText:string;
  public messageArray: {user:string, message:string}[] = [];
  private storageArray =[];

  public currentUser:ILoggedUser;
  public selectedGame:IGame;

  constructor(private partyGameApi: PartygameService, private livechatService: LivechatService )
  {
    this.currentUser ={
      id:0,
      password:"",
      userName:""
    }
    this.currentUser.id = parseInt(sessionStorage.getItem('userId'));
    this.currentUser.userName = sessionStorage.getItem('userName');
    this.currentUser.password = sessionStorage.getItem('userPassword');
  }

  ngOnInit(): void
  {
    this.currentUser.id = parseInt(sessionStorage.getItem('userId'));
    this.currentUser.userName = sessionStorage.getItem('userName');
    this.currentUser.password = localStorage.getItem('userPassword');
    this.selectGameRoomHandler();
  }

  selectGameRoomHandler():void
  {
    this.roomId = '1';//this.selectedGame.id.toString();
    this.livechatService.getMessage().subscribe((data: {user:string, message:string}) => {
            this.messageArray.push(data);
        });

    this.join(this.currentUser.userName,this.roomId);
  }

  join(username:string, roomId:string):void
  {
    this.livechatService.joinRoom({user:username, room:roomId});
  }

  sendMessage():void
  {
    this.livechatService.sendMessage({
      user: this.currentUser.userName,
      room: this.roomId,
      message:this.messageText
    });

    this.messageText = '';
  }

}
