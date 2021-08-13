import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BoardComponent } from 'src/app/tictactoe/board/board.component';
@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  private socket: Socket;
  //private url = 'http://localhost:3001';
  private url = 'https://pgsocketserver.herokuapp.com/';

  constructor() {
    this.socket = io (this.url, {transports: ['websocket', 'pulling', 'flashsocket']});
   }
  
  joinRoom(data):void{
    //this.socket.emit('join', data);
  }

  sendTicTacToeData(data):void{
    this.socket.emit('gameboard', data);
  }

  getTicTacToeData():Observable<any>{
    return new Observable<{gameBoard : BoardComponent}>(observer => {
      this.socket.on('new gameboard', (data) => {
        observer.next(data);
      });
      return() => {
        this.socket.disconnect();
      }
    });
  }
  leaveRoom(data):void{
    this.socket.emit('leave', data);
  }
}
