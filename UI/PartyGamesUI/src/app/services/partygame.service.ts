import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILoggedUser, IUser } from './user';
import { Observable, BehaviorSubject } from 'rxjs';
import { IGame } from './game';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { IScore } from './score';

@Injectable({
  providedIn: 'root'
})
export class PartygameService {
  // url referencing the WebAPI
  private url = "https://dotnetpartygames.azurewebsites.net/";

 isLoggedIn:boolean;
  currentScore: IScore = {
    gamesId:null,
    userId:null,
    score:null,
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
    return !!(sessionStorage.getItem('userId') && sessionStorage.getItem('userName') && sessionStorage.getItem('userPassword'));
  }

  //AddScore Methoid
  addscore(model: any): Observable<IScore>{
    return this.http.post<IScore>(this.url+'user/addScore', model);
  }
  updateSnakeStats(model: any): Observable<IScore>{
    return this.http.post<IScore>(this.url+'user/updateSnakeStats',model);
  }

  //Register method
  register(model: any):Observable<ILoggedUser> {
    return this.http.post<ILoggedUser>(this.url+'user/add',model);
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
