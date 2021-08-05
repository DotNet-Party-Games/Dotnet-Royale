import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { PartygameService } from '../services/partygame.service';
import { IUser } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: IUser;

  loginUserGroup = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl()
  });

  constructor(private partyGameApi: PartygameService,private router: Router) { }

  ngOnInit(): void {
    let temp: IUser =
    {
      UserName: "",
      Password: "",
      IsAdmin: false
    }
    this.currentUser = temp;
  }

  
  onSubmit(loginUserGroup:FormGroup) {
    const loginObserver ={
      next:x => console.log('user logged in'),
      error: err => console.log(err)
    }
    this.partyGameApi.login(loginUserGroup.value).subscribe(loginObserver);
    this.redirect('layout');
  }
  //redirect to layout page after login
  redirect(page:string) {
    this.router.navigate([page]);
  }
  //cancel login
  cancel(page:string)
  {
    window.location.href = page;
  }
}
