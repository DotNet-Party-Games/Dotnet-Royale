import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LivechatService {

  private socket: Socket;
  //private url='http://localhost:3001';
  //private url='https://arcane-woodland-27869.herokuapp.com/'; // your server local path
  private url = 'https://partygamesocket.herokuapp.com/';

  constructor() { 
    this.socket = io(this.url, {transports:['websocket','pulling','flashsocket']});
    
  }

  joinRoom(data):void{
    this.socket.emit('join',data);
  }

  sendMessage(data):void{
    this.socket.emit('message',data);
  }

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
  
  // getStorage() {
  //   const storage: string = localStorage.getItem('chats');
  //   return storage ? JSON.parse(storage) : [];
  // }

  // setStorage(data) {
  //   localStorage.setItem('chats', JSON.stringify(data));
  // }
}
