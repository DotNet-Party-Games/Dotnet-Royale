import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LivechatService {

  private socket: Socket;
  private url='http://localhost:3001';
  //private url = 'http://20.81.113.152/dotnetroyalesocket/';
  //private url = 'https://pgsocketserver.herokuapp.com/';


  constructor() {
    this.socket = io(this.url, {transports:['websocket','pulling','flashsocket']});

  }

  joinRoom(data):void{
    this.socket.emit('join',data);
  }

  reloadRoomList(username):void{
    this.socket.emit('reloadRoomList', username);
  }

  sendMessage(data):void{
    this.socket.emit('message',data);
  }

  //repeat this for sendgame state, receive game state and display that within layout HTML (game.snakepos)
  getMessage():Observable<any>{
    return new Observable<{user: string, message:string}>(observer => {
      this.socket.on('new message',(data) =>{
        observer.next(data);
      });
      return()=>{
        this.socket.disconnect();
      }
    });
  }

  leaveRoom(data):void{
    this.socket.emit('leave',data);
  }

  getUserList():Observable<any>{
    return new Observable<any>(observer=>{
      this.socket.on('updatedUserList',(userList)=>{
        observer.next(userList);
      });
      return()=>{
        this.socket.disconnect();
      }
    });
  }

  getRoomList():Observable<any>{
    return new Observable<any>(observer=>{
      this.socket.on('updatedRoomList',(roomList)=>{
        observer.next(roomList);
      });
      return()=>{
        this.socket.disconnect();
      }
    });
  }

}
