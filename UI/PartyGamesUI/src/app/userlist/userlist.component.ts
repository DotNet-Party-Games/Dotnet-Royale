import { Component, OnInit } from '@angular/core';
import { PartygameService } from '../services/partygame.service';
import { IUser } from '../services/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: IUser[]

  constructor(private partyGameApi: PartygameService) {
    this.users = [
      {
        UserName: "User 1",
        Password: "",
        IsAdmin: false
      },
      {
        UserName: "User 2",
        Password: "",
        IsAdmin: false
      },
      {
        UserName: "User 3",
        Password: "",
        IsAdmin: false
      }
    ]
  }

  ngOnInit(): void {
    this.getUserList();
    console.log(this.users);
  }

  getUserList()
  {
    this.partyGameApi.getUsers().subscribe((response: IUser[]) => { this.users = response });
  }

}
