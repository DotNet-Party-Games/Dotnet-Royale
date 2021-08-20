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
  private newGameState = new BehaviorSubject<any>({});
  currentGameState = this.newGameState.asObservable();
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
  getSnakeGameState():void {
      this.socket.on('new gamestate', (data) => {
        this.newGameState.next(data.b);
      });
    }
  
}
