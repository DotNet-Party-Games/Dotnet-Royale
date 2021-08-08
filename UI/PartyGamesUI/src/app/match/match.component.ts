import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextOrientation, TextAlignment } from 'ngx-wheel';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit{
  @ViewChild(NgxWheelComponent, { static: false }) wheel;

  seed = [...Array(10).keys()]
  idToLandOn: any;
  items: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER

  ngOnInit(): void {
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#203fbd', '#0a143d']
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value %2],
      text: 'Player ' + value,
      id: value,
      textFillStyle: 'white',
      textFontSize: '12'
    }))
  }

  reset() {
    this.wheel.reset();
  }

  before(){
  }

  async spin() {
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  after(){
  }

}
