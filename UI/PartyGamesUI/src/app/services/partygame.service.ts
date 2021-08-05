import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from './user';
import {map} from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PartygameService {
  // url referencing the WebAPI
  private url = "https://dotnetpartygames.azurewebsites.net/";
  isLoggedIn:boolean;
  userId:number;
  currentUser:IUser = {
    UserName:null,
    Password:null,
    IsAdmin:false,
  };

  //service constructor
  constructor(private http: HttpClient) { }

  //login method
  login(model: FormGroup):Observable<IUser> {
    return this.http.post(this.url +'login', model).pipe(
      map((response: any)=>{
        this.isLoggedIn = response.result.succeeded;
        this.currentUser.UserName = response.UserName;
        this.currentUser.Password =response.Password;
        this.userId = response.Id;
        this.currentUser.IsAdmin = response.IsAdmin;
        return this.currentUser;
      })
    )
  }

  //Register method
  register(model: any) {
    return this.http.post(this.url+'add',model).pipe(
      map((response: any)=>{
        this.isLoggedIn = response.result.succeeded;
        this.currentUser.UserName = response.UserName;
        this.currentUser.Password =response.Password;
        this.userId = response.Id;
        this.currentUser.IsAdmin = response.IsAdmin;
        return this.currentUser;
      })
    )
  }
  // service method for login an user
  getUserByUserNameAndPassword(name: string, password: string) : Observable<IUser>
  {
    return this.http.get<IUser>(this.url +"login"+{name,password});
  }

  
}
