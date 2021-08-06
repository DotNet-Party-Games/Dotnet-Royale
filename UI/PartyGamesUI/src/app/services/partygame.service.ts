import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ILoggedUser, IUser } from './user';
import { IGame } from './game';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

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

  //service constructor
  constructor(private http: HttpClient) { }

  //login method
  login(model: FormGroup):Observable<ILoggedUser> {
    return this.http.post<ILoggedUser>(this.url +'user/getuserfromusernameandpassword/', model);
  }
  loggedIn(){
    return !!(localStorage.getItem('userId') && localStorage.getItem('userName') && localStorage.getItem('userPassword'));
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
    return this.http.get<IUser>(this.url +"login"+{name,password});
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
