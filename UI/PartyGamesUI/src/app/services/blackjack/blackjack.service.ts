import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BlackjackComponent } from 'src/app/blackjack/blackjack.component';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {

  private socket: Socket;
  private url='http://localhost:3000';
  //private url = 'http://20.81.113.152/dotnetroyalesocket/';
  //private url = 'https://pgsocketserver.herokuapp.com/';
  constructor() { 
    this.socket = io(this.url, {transports:['websocket','pulling','flashsocket']});
  }

  joinRoom(data):void{
    this.socket.emit('join',data);
  }

  sendBlackJackData(data):void{
    this.socket.emit('blackjack',data)
  }

  getBlackJackData():Observable<any>{
    return new Observable<{blackjack: BlackjackComponent}>(observer => {
      this.socket.on('new blackjack', (data) => {
        observer.next(data);
      });
      return() =>{
        this.socket.disconnect();
      }
    });
  }

  leaveRoom(data):void{
    this.socket.emit('leave',data);
  }

}
