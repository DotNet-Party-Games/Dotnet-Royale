import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivechatService } from '../services/livechat/livechat.service';
import { IRoom } from '../services/room';
import { SocketioService } from '../services/socketio/socketio.service';

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
  constructor(private router: Router, private socketService: SocketioService ) { }

  ngOnInit(): void {

    this.username = sessionStorage.getItem('userName');
    this.roomId = sessionStorage.getItem('roomId');
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
    this.socketService.leaveRoom({room: this.roomId, user: this.username});
    this.router.navigate(['/main']);
  }

  getRoomList(){
    this.socketService.getRoomList().subscribe(roomList => {
      this.rooms=roomList;
    });
  }

  reloadRoomList(){
    this.socketService.reloadRoomList(this.username);
  }

  joinRoom(username:string, roomId:string):void
  {
    let oldRoomId: string = sessionStorage.getItem('roomId');
    if(oldRoomId && oldRoomId != roomId){
      this.socketService.leaveRoom({user:username, room:oldRoomId})
    }
    this.socketService.joinRoom({user:username, room:roomId});
    this.roomId = roomId;
  }

  showInputRoomId(){
    this.isInputRoomId = true;
  }

  hideInputRoomId(){
    this.isInputRoomId = false;
  }

}
