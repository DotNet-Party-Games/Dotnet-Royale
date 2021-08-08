
import { Component } from '@angular/core';
import { PartygameService } from './services/partygame.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'PartyGamesUI';

  constructor(public _partyGameService:PartygameService, private router: Router){}

  onLogout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPassword");
    this.router.navigate(['/Login']);
  }

}
