import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from './user';
import { IGame } from './game';

@Injectable({
  providedIn: 'root'
})
export class PartygameService {

  private url = "https://dotnetpartygames.azurewebsites.net/";

  constructor(private http: HttpClient) { }

  getUserByUserNameAndPassword(name: string, password: string) : Observable<IUser>
  {
    return this.http.get<IUser>(this.url + name + '&' + password);
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
