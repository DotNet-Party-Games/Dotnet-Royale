import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged,map } from "rxjs/operators";
import { defaultGameState } from "./snake";
import { GameState } from "./models";

const DEFAULT_GAME_STATE = defaultGameState();

@Injectable({providedIn: 'root'})
export class SnakeData {
    private state = new BehaviorSubject<GameState>(DEFAULT_GAME_STATE);

    public select(): Observable<GameState>
    public select<T>(selector: (state: GameState) => T): Observable<T>
    public select<T>(selector?: (state: GameState)=> T | GameState): Observable<T | GameState> {
        selector = selector ?? (state => state );
        return this.state.asObservable().pipe(
            map(selector),
            distinctUntilChanged(),
        );
    }

    public reduce(reducer: (state: GameState) => GameState)
    {
        const newState = reducer(this.state.value);
        this.state.next(newState);
    }

    public reset(){
        this.state.next(DEFAULT_GAME_STATE);
    }
}