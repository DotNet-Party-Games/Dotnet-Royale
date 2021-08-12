import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { PartygameService } from '../services/partygame.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserGroup = new FormGroup({
    UserName: new FormControl(),
    Password: new FormControl(),
  });

  constructor(private partyGameApi: PartygameService,private router: Router) { }

  ngOnInit(): void {}
  
  // this method call the service register method to add a user
  // parm: registerUserGroup 
  onSubmit(registerUserGroup:FormGroup) {  
    this.partyGameApi.register(registerUserGroup.value).subscribe(res=>{
      console.log(res)
      if(res){
        sessionStorage.setItem('userId',res.id.toString())
        sessionStorage.setItem('userName',res.userName.toString())
        sessionStorage.setItem('userPassword',res.password.toString())
        // calling the redirect method to redirect to home page 
        this.redirect('/layout');
      }
    });    
  }

  //redirection method
  redirect(page:string) {
    this.router.navigate([page]);
  }

  //cancel registration
  cancel(page:string)
  {
    window.location.href = page;
  }


}
