import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private gameIdSource = new BehaviorSubject<number>(1);
  currentGameId = this.gameIdSource.asObservable();

  constructor() { }

  changeGameId(p_gameId: number) {
    this.gameIdSource.next(p_gameId)
  }
}
