import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BoardComponent } from 'src/app/tictactoe/board/board.component';
@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  private socket: Socket;
  private url = 'http://localhost:3000';
  //private url = 'http://20.81.113.152/dotnetroyalesocket/';
  //private url = 'https://pgsocketserver.herokuapp.com/';
  private newTTTTGameState = new BehaviorSubject<any>({});
  currentTTTTGameState = this.newTTTTGameState.asObservable();
  private playerList = new BehaviorSubject<any>({});
  currentPlayerList = this.playerList.asObservable();
  constructor() {
    this.socket = io(this.url, { transports: ['websocket', 'pulling', 'flashsocket'] });
  }

  joinRoom(data): void {
    this.socket.emit('join', data);
  }
  sendTicTacToeData(data): void {
    this.socket.emit('gameboard', data);
  }

  getTicTacToeData(): void{
      this.socket.on('new gameboard', (data) => {
        this.newTTTTGameState.next(data);
        console.log("got data from server");
        console.log(data);
      });
  }

  sendAudioTrigger(data): void {
    this.socket.emit('play audio', data)
  }
  getAudioTrigger(): Observable<any> {
    return new Observable<{ gameboard: BoardComponent }>(observer => {
      this.socket.on('receive audio', (data) => {
        observer.next(data);
        console.log("got audio from server");
        console.log(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  leaveRoom(data): void {
    this.socket.emit('leave', data);
  }
  getPlayers(data): void {
    this.socket.emit('getPlayers', data);
  }
  findPlayers(): Observable<any> {
    return new Observable(obs => {
      this.socket.on('foundPlayers', (data) => {
        console.log("in ttt service")
        console.log("got players from socket");
        console.log(data);
        obs.next(data);
        
      });
    });
  }
  // findPlayers():void{
  //   this.socket.on('foundPlayers', (data) => {
  //     this.playerList.next(data);
  //     console.log("got players from socket");
  //     console.log(data);
  //   });
  // }
}


/* Copy all this garbage into the socket index.js when Seunghoon is done
// Hopefully this will work without any trouble
socket.on('play audio', (data) => {
  io.to(data.room).emit('receive audio', {gameboard: data.audioFile});
}





*/
