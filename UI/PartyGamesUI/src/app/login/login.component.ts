import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { PartygameService } from '../services/partygame.service';
import { ILoggedUser, IUser } from '../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: ILoggedUser;
  error:string;
  
  loginUserGroup = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl()
  });

  constructor(private partyGameApi: PartygameService,private router: Router) { }

  ngOnInit(): void {
    this.currentUser=
    {
      id:null,
      userName: "",
      password: ""
    }
  }

  
  onSubmit(loginUserGroup:FormGroup) {
    
    console.log(this.partyGameApi.login(loginUserGroup.value)
    .subscribe(res=>{
        console.log(res)
        if(res){
          localStorage.setItem('userId',res.id.toString())
          localStorage.setItem('userName',res.password.toString())
          localStorage.setItem('userPassword',res.userName.toString())
          this.redirect('layout');
        }else{
          this.error="Username or password invalid"
        }
      }
        
      ));
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
