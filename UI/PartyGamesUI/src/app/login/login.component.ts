import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { PartygameService } from '../services/partygame.service';
import { IUser } from '../services/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  currentUser: IUser;

  loginUserGroup = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl()
  });

  constructor(private partyGameApi: PartygameService,private router: Router, private data: PartygameService) { }
  message:string;
  subscription: Subscription;
  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
    
    let temp: IUser =
    {
      UserName: "",
      Password: ""
    }
    this.currentUser = temp;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  
  onSubmit(loginUserGroup:FormGroup) {
    
    this.partyGameApi.login(loginUserGroup.value);
    console.log("This should be the name from the service:" + this.message);
    if (this.message == "default message")
    {
      this.redirect('Login');
    }
    else{
      this.redirect('layout');
    }
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
