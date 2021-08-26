import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {GameState} from '../../layout/layout.component'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  private socket: Socket;
  private url='http://localhost:3000';
  //private url = 'http://20.81.113.152/dotnetroyalesocket/';
  //private url = 'https://pgsocketserver.herokuapp.com/';
  
  
  
  constructor() 
  {
    this.socket = io(this.url, {transports: ['websocket', 'pulling', 'flashsocket']});
  }
  joinRoom(data):void{
    this.socket.emit('join', data);
  }
  sendSnakeGameState(data): void {
    this.socket.emit('gamestate', data);
  }
  getSnakeGameState():Observable<any> {
    return new Observable<any>(observer=>{
      this.socket.on('new gamestate',(data)=>
      observer.next(data.b));
    });
    //keep getsnakegamestate as a method observable, subscribe to it in layout and loop through doing .next for the amount of players in the lobby and concat it with the display snake 
    }
  
}
