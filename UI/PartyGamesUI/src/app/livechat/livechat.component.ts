import { IGame } from '../services/game';
import { LivechatService } from '../services/livechat/livechat.service';
import { PartygameService } from '../services/partygame.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILoggedUser } from '../services/user';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {

  public roomId : string;
  public messageText:string;
  public messageArray: {user:string, message:string}[] = [];
  private storageArray =[];

  public currentUser:ILoggedUser;
  public selectedGame:IGame;

  public gameList:IGame[];


  constructor(private partyGameApi: PartygameService, private livechatService: LivechatService ) 
  {
    this.currentUser ={
      id:0,
      password:"",
      userName:""
    }
    this.currentUser.id = parseInt(sessionStorage.getItem('userId'));
    this.currentUser.userName = sessionStorage.getItem('userName');
    this.currentUser.password = sessionStorage.getItem('userPassword');
  }

  ngOnInit(): void 
  {
    this.getGameList();
    this.currentUser.id = parseInt(sessionStorage.getItem('userId'));
    this.currentUser.userName = sessionStorage.getItem('userName');
    this.currentUser.password = localStorage.getItem('userPassword');
    
  }

  selectGameRoomHandler(gameName:string):void
  {
    this.selectedGame = this.gameList.find(game=>game.name === gameName);
    this.roomId = this.selectedGame.id.toString();
    if(this.roomId){
    // this.storageArray = this.livechatService.getStorage();
    // const storeIndex = this.storageArray.findIndex((storage) => storage.roomId === this.roomId);
        this.livechatService.getMessage()    
        .subscribe((data: {user:string, message:string}) => {
          
            console.log(data);
            this.messageArray.push(data);
            setTimeout(()=>{
              //this.storageArray = this.livechatService.getStorage();
              // const storeIndex = this.storageArray.findIndex((storage) => storage.roomId === this.roomId);
              // this.messageArray = this.storageArray[storeIndex].chats;
            },500);        
          
        });
      }
    // if(storeIndex>-1){
    //   this.messageArray = this.storageArray[storeIndex].chats;
    // }

    this.join(this.selectedGame.name,this.roomId);
  }

  join(username:string, roomId:string):void
  {
    this.livechatService.joinRoom({user:username, room:roomId});
  }

  sendMessage():void
  {
    this.livechatService.sendMessage({
      user: this.currentUser.userName,
      room: this.roomId,
      message:this.messageText
    });
    // this.storageArray = this.livechatService.getStorage();
    // const storeIndex = this.storageArray.findIndex((storage) => storage.roomId === this.roomId);

    // if(storeIndex>-1){
    //     this.storageArray[storeIndex].chats.push({
    //       user:this.currentUser.userName,
    //       message:this.messageText
    //     });
    // }else{
    //   const updateStorage ={
    //     roomId:this.roomId,
    //     chats:[{
    //       user:this.currentUser.userName,
    //       message: this.messageText,
    //     }]
    //   };
    //   this.storageArray.push(updateStorage);
    // }
    // this.livechatService.setStorage(this.storageArray);
    
    this.messageText = '';
  }
  getGameList()
  {
    this.partyGameApi.getGames().subscribe((response: IGame[]) => { this.gameList = response });
  }
 
}
