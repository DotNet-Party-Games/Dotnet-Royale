import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { BoardComponent } from 'src/app/tictactoe/board/board.component';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: Socket;
  private url = 'http://localhost:3000';
  private newGameState = new BehaviorSubject<any>({ x: 1, y: 1 });
  currentGameState = this.newGameState.asObservable();
  private newBlackjack = new BehaviorSubject<any>({});
  currentBlackjack = this.newBlackjack.asObservable();
  private newTTTTGameState = new BehaviorSubject<any>({});
  currentTTTTGameState = this.newTTTTGameState.asObservable();
  private playerList = new BehaviorSubject<any>({});
  currentPlayerList = this.playerList.asObservable();

  //private url = 'http://20.81.113.152/dotnetroyalesocket/';
  //private url = 'https://pgsocketserver.herokuapp.com/';
  constructor() {
    this.socket = io(this.url, { transports: ['websocket', 'pulling', 'flashsocket'] });
  }
  // ================= General Room Stuff ============================== 
  joinRoom(data): void {
    this.socket.emit('join', data);
    sessionStorage.setItem('roomId', data.room);
  }

  reloadRoomList(username): void {
    this.socket.emit('reloadRoomList', username);
  }
  leaveRoom(data): void {
    this.socket.emit('leave', data);
    sessionStorage.removeItem('roomId');
  }

  getRoomList(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('updatedRoomList', (roomList) => {
        observer.next(roomList);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  //========================= General Player Stuff ========================
  getPlayers(data): void {
    this.socket.emit('getPlayers', data);
  }
  findPlayers(): Observable<any> {
    return new Observable(obs => {
      this.socket.on('foundPlayers', (data) => {
        console.log("got players from socket");
        console.log(data);
        obs.next(data);
      });
    });
  }

  //================ General Audio Stuff ============================
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
  //================ chatroom stuff ======================================
  sendMessage(data): void {
    this.socket.emit('message', data);
  }

  //repeat this for sendgame state, receive game state and display that within layout HTML (game.snakepos)
  getMessage(): Observable<any> {
    return new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  //====================== Snake stuff ============================
  sendSnakeGameState(data): void {
    this.socket.emit('gamestate', data);
  }
  getSnakeGameState(): void {
    this.socket.on('new gamestate', (data) => {
      this.newGameState.next(data.b);
    });
  }

  //==================== Black Jack Stuff ==========================
  sendBlackJackData(data): void {
    this.socket.emit('blackjack', data)
  }

  getBlackJackData(): void {
    this.socket.on('new blackjack', (data) => {
      this.newBlackjack.next(data);
    })
  }


  //====================== Tic Tac Toe Time Stuff ==================
  sendTicTacToeData(data): void {
    this.socket.emit('gameboard', data);
  }

  getTicTacToeData(): void {
    this.socket.on('new gameboard', (data) => {
      this.newTTTTGameState.next(data);
      console.log("got data from server");
      console.log(data);
    });
  }
}
