import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { PartygameService } from '../services/partygame.service';
import { ILoggedUser, IUser } from '../services/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  currentUser: ILoggedUser;
  error:string;

  loginUserGroup = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl()
  });
message:string;
  subscription: Subscription;

  constructor(private partyGameApi: PartygameService,private router: Router,private data: PartygameService) { }

  ngOnInit(): void {
    this.currentUser={
      id:null,
      userName: "",
      password: ""
    }
  this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(loginUserGroup:FormGroup) {


    console.log(this.partyGameApi.login(loginUserGroup.value)
    .subscribe(res=>{
        console.log(res)
        if(res){
          sessionStorage.setItem('userId',res.id.toString())
          sessionStorage.setItem('userName',res.password.toString())
          sessionStorage.setItem('userPassword',res.userName.toString())
          this.redirect('/layout');
        }else{
          this.error="Username or password invalid"
        }
      }

      ));


//     this.partyGameApi.login(loginUserGroup.value);
//     console.log("This should be the name from the service:" + this.message);
//     if (this.message == "default message")
//     {
//       this.redirect('Login');
//     }
//     else{
//       this.redirect('layout');
//     }

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
