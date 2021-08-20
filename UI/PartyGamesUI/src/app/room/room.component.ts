import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Live } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';
import { LivechatService } from '../services/livechat/livechat.service';
import { IRoom } from '../services/room';

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

  constructor(private router: Router, private livechatService: LivechatService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('userName');
    this.roomId = sessionStorage.getItem('roomId');
    this.reloadRoomList();
    this.getRoomUserList();
    this.randomGameId();
  }

  reloadRoomList(){
    this.livechatService.reloadRoomList(this.username);
  }

  getRoomUserList(){
    this.livechatService.getRoomList().subscribe(roomList => {
      let room = roomList.find(({id}) => id == this.roomId);
      this.userList = room.users;
    });
  }

  goToLobby(){
    this.livechatService.leaveRoom({user:this.username, room:this.roomId})
    this.router.navigate(['/lobby']);
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
        this.router.navigate(['/blackjack'])
        break;
      }
      case 3: {
        this.router.navigate(['/tictactoe'])
        break;
      }
      default: {

      }
    }
  }

}
