import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from '../services/socketio/socketio.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  username: string;
  gameId: number;
  roomId: string;
  userList: string[];

  constructor(private router: Router, private socketService: SocketioService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('userName');
    this.roomId = sessionStorage.getItem('roomId');
    this.reloadRoomList();
    this.getRoomUserList();
    this.randomGameId();
  }

  reloadRoomList(){
    this.socketService.reloadRoomList(this.username);
  }

  getRoomUserList(){
    this.socketService.getRoomList().subscribe(roomList => {
      let room = roomList.find(({id}) => id == this.roomId);
      if(room) this.userList = room.users;
    });
  }

  goToLobby(){
    this.leaveRoom(this.username, this.roomId);
    this.router.navigate(['/lobby']);
  }

  leaveRoom(username:string, roomId:string):void
  {
    this.socketService.leaveRoom({user:username, room:roomId});
    sessionStorage.removeItem("roomId");
  }

  setGameId(p_gameId: number)
  {
    this.gameId = p_gameId;
  }

  randomGameId()
  {
    this.gameId = Math.floor(Math.random() * 3) + 1;
  }

  goToGame()
  {
    switch(this.gameId) {
      case 1: {
        this.router.navigate(['/snake']);
        break;
      }
      case 2: {
        this.router.navigate(['/blackjack']);
        break;
      }
      case 3: {
        this.router.navigate(['/tictactoe']);
        break;
      }
      case 4: {
        this.router.navigate(['/lightbike']);
        break;
      }
      default: {

      }
    }
  }

}
