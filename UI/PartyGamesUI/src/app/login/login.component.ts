import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PartygameService } from '../services/partygame.service';
import { IUser } from '../services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // modal:any = document.getElementById('id01');

  currentUser: IUser;

  userGroup = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl()
  });

  constructor(private partyGameApi: PartygameService) { }

  ngOnInit(): void {
    let temp: IUser =
    {
      Id: 0,
      UserName: "",
      Password: "",
      IsAdmin: false
    }
    this.currentUser = temp;
  }

  getUser(userGroup: FormGroup)
  {
    if(userGroup.get("username").value && userGroup.get("password").value)
    {
      this.partyGameApi.getUserByUserNameAndPassword(userGroup.get("username").value, userGroup.get("password").value).subscribe(
        (response) => {
          this.currentUser.Id = response.Id;
          this.currentUser.UserName = response.UserName;
          this.currentUser.Password = response.Password;
          this.currentUser.IsAdmin = response.IsAdmin;
        }
      )
    }
  }

  cancel()
  {
    document.getElementById('id01').style.display='none'
  }
}
