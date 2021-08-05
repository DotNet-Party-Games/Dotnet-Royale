import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'PartyGamesUI';
  mode: number = 0;

  setToGameMode()
  {
    this.mode = 1;
  }

  setToMatchMakingMode()
  {
    this.mode = 0;
  }

}
