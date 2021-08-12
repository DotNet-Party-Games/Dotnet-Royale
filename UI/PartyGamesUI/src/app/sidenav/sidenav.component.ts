import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router, private data: DataService) { }

  ngOnInit(): void {

  }

  openNav():void {
    document.getElementById("mySidenav").style.width = "20%";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  home(){
    this.data.changeGameId(-1);
    this.router.navigate(['/layout']);
  }
}
