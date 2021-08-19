import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToRoom(){
    this.router.navigate(['/room']);
  }

  goToMain(){
    this.router.navigate(['/main']);
  }

}
