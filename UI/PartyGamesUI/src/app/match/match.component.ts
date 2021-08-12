import { Component, OnInit, ViewChild } from '@angular/core';
//import { NgxWheelComponent, TextOrientation, TextAlignment } from 'ngx-wheel';
import { LivechatService } from '../services/livechat/livechat.service';

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

  constructor(private livechatService: LivechatService) {}

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
      this.joinedUsers=userList
    });
  }

}
