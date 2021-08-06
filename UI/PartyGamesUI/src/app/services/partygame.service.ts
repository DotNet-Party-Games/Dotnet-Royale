import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from './user';
import { IGame } from './game';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PartygameService {
  // url referencing the WebAPI
  private url = "https://dotnetpartygames.azurewebsites.net/";
  isLoggedIn:boolean;
  userId:number;
  username: string;
  currentUser:IUser = {
    UserName:null,
    Password:null
  };
  private messageSource = new BehaviorSubject("default message");
  currentMessage = this.messageSource.asObservable();
  //service constructor
  constructor(private http: HttpClient) { }
  //login method
  login(model: FormGroup) {
    var work = this.http.post(this.url +'user/getUserFromUserNameAndPassword', model).pipe(
      map((response: any)=>{
        this.currentUser.UserName = response.UserName;
        this.currentUser.Password =response.Password;
        this.userId = response.Id;
        this.username = response.UserName;
      })
    )
    console.log ("current user: " + this.currentUser.UserName + " " + this.username);
    //this shoud work given that the login mapping above works however, it binds to null
    this.changeMessage(this.username);
    return this.currentUser;
  }
  //sends current user to parent event (who subscribes)
  changeMessage(message: string)
  {
    console.log("This was successful");
    this.messageSource.next(message);
  }
  

  //Register method
  register(model: any) {
    return this.http.post(this.url+'user/add',model).pipe(
      map((response: any)=>{
        this.isLoggedIn = response.result.succeeded;
        this.currentUser.UserName = response.UserName;
        this.currentUser.Password =response.Password;
        this.userId = response.Id;
        return this.currentUser;
      })
    )
  }
  // service method for login an user
  getUserByUserNameAndPassword(name: string, password: string) : Observable<IUser>
  {
    return this.http.get<IUser>(this.url +  name + '/' + password);
  }

  getUsers() : Observable<IUser[]>
  {
    return this.http.get<IUser[]>(this.url + "User")
  }

  getGames() : Observable<IGame[]>
  {
    return this.http.get<IGame[]>(this.url + "Game")
  }
}
