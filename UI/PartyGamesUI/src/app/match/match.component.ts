import { Component, OnInit, ViewChild } from '@angular/core';
//import { NgxWheelComponent, TextOrientation, TextAlignment } from 'ngx-wheel';
import { LivechatService } from '../services/livechat/livechat.service';
import { DataService } from '../services/data.service';
import { PartygameService } from '../services/partygame.service';
import { IGame } from '../services/game';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit{
  //@ViewChild(NgxWheelComponent, { static: false }) wheel;

  // seed = [...Array(10).keys()]
  // idToLandOn: any;
  // items: any[];
  // textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  // textAlignment: TextAlignment = TextAlignment.OUTER

  joinedUsers: string[]; // Placeholder for joined users list
  counterpart: string = "";
  games: IGame[];
  currentGameId: number;
  currentGameName: string;

  constructor(private livechatService: LivechatService, private partyGameApi: PartygameService, private data: DataService) {}

  ngOnInit(): void {
    // this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    // const colors = ['#203fbd', '#0a143d']
    // this.items = this.seed.map((value) => ({
    //   fillStyle: colors[value %2],
    //   text: 'Player ' + value,
    //   id: value,
    //   textFillStyle: 'white',
    //   textFontSize: '12'
    // }))

    // Method to get joined users list from live chat
    // this.data.joinedUsers.subscribe(result => {
    //   console.log(result);
    //   this.joinedUsers = result;
    //   console.log(this.joinedUsers);
    // });

    this.getConnectedUser();
    this.data.currentGameId.subscribe(p_gameId => {
      this.currentGameId = p_gameId;
    });
    
  }

  // reset() {
  //   this.wheel.reset();
  // }

  // before(){
  // }

  // async spin() {
  //   this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
  //   await new Promise(resolve => setTimeout(resolve, 0));
  //   this.wheel.spin();
  // }

  // after(){
  // }

  // Method to get joined users list from the socket server and store into UserList
  getConnectedUser(){
    this.livechatService.getUserList().subscribe(userList => {

      // remove current user from userlist
      let index = userList.indexOf(sessionStorage.userName);
      userList.splice(index, 1);

      this.joinedUsers=userList;
      this.selectCounterPart();
    });
  }

  selectCounterPart(){
    let index = Math.floor(Math.random() * this.joinedUsers.length);
    this.counterpart = this.joinedUsers[index]+sessionStorage.getItem("userName")+sessionStorage.getItem("userId");;
    console.log(this.counterpart);
  }

  selectGame(){
    this.partyGameApi.getGames().subscribe((response: IGame[]) => { this.games = response });
    console.log(this.games);
    let index = Math.floor(Math.random() * this.games.length);
    this.currentGameId = this.games[index].id;
    this.currentGameName = this.games[index].name;
    this.data.changeGameId(this.currentGameId);
  }

}
