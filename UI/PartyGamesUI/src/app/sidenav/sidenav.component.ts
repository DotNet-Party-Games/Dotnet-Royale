import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
   openNav():void {
    document.getElementById("mySidenav").style.width = "20%";
  }
  
   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

}
