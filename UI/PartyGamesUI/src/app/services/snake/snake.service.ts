import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {GameState} from '../../layout/layout.component'


@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  private socket: Socket;
  private url='http://localhost:3001';
  //private url = 'https://partygamesocket.herokuapp.com/';

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
  getSnakeGameState(): Observable<any>{
    return new Observable<{GameState: any}>(observer => {
      this.socket.on('new gamestate', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
}
