import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILoggedUser, IUser } from './user';
import { Observable, BehaviorSubject } from 'rxjs';
import { IGame } from './game';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { IScore } from './score';
import { Leader } from './leader';

@Injectable({
  providedIn: 'root'
})
export class PartygameService {
  // url referencing the WebAPI
  private url = "https://dotnetpartygames.azurewebsites.net/";


  loggedUser:ILoggedUser = {
    id:null,
    userName:null,
    password:null
  }
 isLoggedIn:boolean;
  userId:number;
  username: string;
  currentUser:IUser = {
    id:null,
    username:null,
    password:null
  };
  private messageSource = new BehaviorSubject("default message");
  currentMessage = this.messageSource.asObservable();

  //service constructor
  constructor(private http: HttpClient) { }
  //login method

  login(model: FormGroup):Observable<ILoggedUser> {
    return this.http.post<ILoggedUser>(this.url +'user/getuserfromusernameandpassword/', model);
  }
  loggedIn(){
    return !!(localStorage.getItem('userId') && localStorage.getItem('userName') && localStorage.getItem('userPassword'));

//   login(model: FormGroup) {
//     var work = this.http.post(this.url +'user/getuserfromusernameandpassword/', model).pipe(
//       map((response: any)=>{
//         this.currentUser.UserName = response.UserName;
//         this.currentUser.Password =response.Password;
//         this.userId = response.Id;
//         this.username = response.UserName;
//       })
//     )
//     console.log ("current user: " + this.currentUser.UserName + " " + this.username);
//     //this shoud work given that the login mapping above works however, it binds to null
//     this.changeMessage(this.username);
//     return this.currentUser;
//   }
//   //sends current user to parent event (who subscribes)
//   changeMessage(message: string)
//   {
//     console.log("This was successful");
//     this.messageSource.next(message);

  }


  //Register method
  register(model: any) {
    return this.http.post(this.url+'user/add',model).pipe(
      map((response: any)=>{
        this.loggedUser.userName = response.UserName;
        this.loggedUser.password =response.Password;
        this.loggedUser = response.Id;
        return this.loggedUser;
      })
    )
  }
  register1(model: any) {
    return this.http.post(this.url+'user/add',model);
  }
  // service method for login an user
  getUserByUserNameAndPassword(name: string, password: string) : Observable<IUser>
  {
    return this.http.get<IUser>(this.url +  name + '/' + password);
  }

  getGames() : Observable<IGame[]>
  {
    return this.http.get<IGame[]>(this.url + "Game");
  }

  getTop10ScoresByGameId(gameId: number) : Observable<IScore[]>
  {
    return this.http.get<IScore[]>(this.url + "Game/getTop10ScoresByGameId/" + gameId);
  }

  getUserFromUserId(userId: number) : Observable<IUser>
  {
    return this.http.get<IUser>(this.url + "User/getUserFromUserId/" + userId);
  }

}
