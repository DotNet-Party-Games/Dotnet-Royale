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
        Id: 1,
        UserName: "User 1",
        Password: "",
        IsAdmin: false
      },
      {
        Id: 2,
        UserName: "User 2",
        Password: "",
        IsAdmin: false
      },
      {
        Id: 3,
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
