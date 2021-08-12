import { IGame } from '../services/game';
import { LivechatService } from '../services/livechat/livechat.service';
import { PartygameService } from '../services/partygame.service';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILoggedUser } from '../services/user';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit,OnChanges {

  public roomId : string;
  public messageText:string;
  public messageArray: {user:string, message:string}[] = [];

  public currentUser:ILoggedUser;
  public selectedGame:IGame;

  public UserList:[];

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
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void
  {
    this.currentUser.id = parseInt(sessionStorage.getItem('userId'));
    this.currentUser.userName = sessionStorage.getItem('userName');
    this.currentUser.password = localStorage.getItem('userPassword');
    this.selectGameRoomHandler();
    this.getConnectedUser();
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
    let elem = document.getElementById('chbody');
      elem.scrollTop = elem.scrollHeight;
  }
  getConnectedUser(){
    this.livechatService.getUserList().subscribe(userList => {
      this.UserList=userList
    });

  }

}
