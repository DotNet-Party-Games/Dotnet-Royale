import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivechatService } from '../services/livechat/livechat.service';
import { IRoom } from '../services/room';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  username: string;
  roomId: string;
  isInputRoomId: boolean = false;
  roomIdInput: string;
  rooms: IRoom[];
  constructor(private router: Router, private livechatService: LivechatService ) { }

  ngOnInit(): void {

    this.username = sessionStorage.getItem('userName');
    this.reloadRoomList()
    this.getRoomList();

  }

  goToRoom(){
    this.router.navigate(['/room']);
  }

  goToMain(){
    this.router.navigate(['/main']);
  }

  getRoomList(){
    this.livechatService.getRoomList().subscribe(roomList => {
      this.rooms=roomList;
    });
  }

  reloadRoomList(){
    this.livechatService.reloadRoomList(this.username);
  }

  joinRoom(username:string, roomId:string):void
  {
    let oldRoomId: string = sessionStorage.getItem('roomId');
    if(oldRoomId){
      this.livechatService.leaveRoom({user:username, room:oldRoomId})
    }
    this.livechatService.joinRoom({user:username, room:roomId});
    sessionStorage.setItem('roomId', roomId);
  }

  showInputRoomId(){
    this.isInputRoomId = true;
  }

  hideInputRoomId(){
    this.isInputRoomId = false;
  }

}
