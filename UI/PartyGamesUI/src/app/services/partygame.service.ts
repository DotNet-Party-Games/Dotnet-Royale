import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from './user';

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
}
