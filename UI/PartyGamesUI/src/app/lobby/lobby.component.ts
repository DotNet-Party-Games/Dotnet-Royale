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
    this.roomId = sessionStorage.getItem('roomId');
    if(!this.roomId)
    {
      sessionStorage.setItem("roomId", 'lobby');
      this.joinRoom(this.username, sessionStorage.getItem('roomId'));
    }
    this.reloadRoomList()
    this.getRoomList();

  }

  goToRoom(p_roomId: string){
    this.joinRoom(this.username, p_roomId);
    this.router.navigate(['/room']);
  }

  goToMain(){
    this.username = sessionStorage.getItem("userName");
    this.roomId = sessionStorage.getItem("roomId");

    this.leaveRoom(this.username, this.roomId);
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
    if(oldRoomId && oldRoomId != roomId){
      this.livechatService.leaveRoom({user:username, room:oldRoomId});
    }
    this.livechatService.joinRoom({user:username, room:roomId});
    this.roomId = roomId;
    sessionStorage.setItem("roomId", this.roomId);
  }

  leaveRoom(username:string, roomId:string):void
  {
    this.livechatService.leaveRoom({user:username, room:roomId});
    sessionStorage.removeItem("roomId");
  }

  showInputRoomId(){
    this.isInputRoomId = true;
  }

  hideInputRoomId(){
    this.isInputRoomId = false;
  }

}
