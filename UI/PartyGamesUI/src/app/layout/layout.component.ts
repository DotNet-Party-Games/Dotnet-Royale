import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  interval,
  Observable,
  Subject
} from "rxjs";
import { distinctUntilChanged, map, takeUntil, tap } from "rxjs/operators";
import { IGame } from '../services/game';

interface GameState {
  width: number;
  height: number;
  snakePos: { x: number; y: number }[];
  food: { x: number; y: number };
  lost: boolean;
}
import { PartygameService } from '../services/partygame.service';
import { DataService } from '../services/data.service';
import { IScore } from '../services/score';
import { SnakeService } from '../services/snake/snake.service';
import { ILoggedUser } from '../services/user';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { BlackjackComponent } from '../blackjack/blackjack.component';


enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

enum FieldType {
  EMPTY,
  SNAKE,
  FOOD
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public roomId : string;
  finalScore: IScore = {
    gamesId:null,
    userId:null,
    score:null
  }
  obj : GameState;
  public currentUser:ILoggedUser;
  games: IGame[];
  currentGameId: number;
  mainScreen: string;
  snakeDirection: Direction;

  game$: BehaviorSubject<GameState>;

  keyDown$: Observable<string>;
  tick$: Observable<number>;
  direction$ = new BehaviorSubject<Direction>(Direction.RIGHT);
  lost$ = new Subject<void>();

  constructor(private partyGameApi: PartygameService, private data: DataService, private snakeService : SnakeService)
  {
    this.currentUser =
    {
      id: 0,
      password: "",
      userName: ""
    }
    this.currentUser.id = parseInt(sessionStorage.getItem('userId'));
    this.currentUser.userName = sessionStorage.getItem('userName');
    this.currentUser.password = sessionStorage.getItem('userPassword');
    
  }

  ngOnInit(): void {
    this.getGameList();
    this.data.currentGameId.subscribe(p_gameId => {
      this.currentGameId = p_gameId;
      if(p_gameId == -1) this.resetScreen();
    });
    this.keyDown$ = fromEvent<KeyboardEvent>(document, "keydown").pipe(
      tap(event => event.stopPropagation()),
      map(event => event.key),
      distinctUntilChanged()
    );
    this.tick$ = interval(110);
    this.direction$.subscribe((currentDirection) =>
    this.snakeDirection = currentDirection);
    const direction = this.keyDown$.pipe(
      map(key => {
        switch (key) {
          case "ArrowUp":
          case "w":
            //if the snake is already going down
            if (this.snakeDirection == 1) {
              //go down
              return Direction.DOWN;
             }
             //if the snake isnt going down, it is allowed to go directly up
            else {
            return Direction.UP;
            }
          case "ArrowDown":
          case "s":
            if (this.snakeDirection == 0) {
              return Direction.UP;
            }
            else {
            return Direction.DOWN;
            }
          case "ArrowLeft":
          case "a":
            if (this.snakeDirection == 3) {
              return Direction.RIGHT;
            }
            else{
            return Direction.LEFT;
            }
          case "ArrowRight":
          case "d":
            if (this.snakeDirection == 2) {
              return Direction.LEFT;
            }
            else{
            return Direction.RIGHT;
            }
          default:
            return this.direction$.value;
        }
      })
    );

    direction.subscribe(this.direction$);

    this.newGame();
    this.selectGameRoomHandler();
  }
  // handles the next game instance given the direction, does not seem to handle control of the snake
  selectGameRoomHandler():void
  {
    this.roomId = '2';
    this.join(this.currentUser.userName, this.roomId);
  }
  join (username:string, roomId:string):void{
    this.snakeService.joinRoom({user:username, room:roomId});
  }
  sendSnakeGameState() : void
  {
    this.snakeService.sendSnakeGameState({GameState: this.game$.value, room: this.roomId});
  }
  getNextField(
    game: GameState,
    direction: Direction
  ): { x: number; y: number } {

    const currentField = game.snakePos[game.snakePos.length-1];
    const nextField = { x: currentField.x, y: currentField.y };
    switch (direction) {
      case Direction.UP:
        //makes it so you can loop to the other side of the map
        if (nextField.y !== 0) {

          nextField.y--;
        } else {

          nextField.y = game.height - 1;
        }
        break;
      case Direction.DOWN:
        if (nextField.y !== game.height - 1) {
          nextField.y++;
        } else {
          nextField.y = 0;
        }
        break;
      case Direction.LEFT:
        if (nextField.x !== 0) {
          nextField.x--;
        } else {
          nextField.x = game.width - 1;
        }
        break;
      case Direction.RIGHT:
        if (nextField.x !== game.width - 1) {
          nextField.x++;
        } else {
          nextField.x = 0;
        }
        break;
    }

    return nextField;
  }

  getFieldType(field: { x: number; y: number }, game: GameState): FieldType {
    if (field.x === game.food.x && field.y === game.food.y) {
      return FieldType.FOOD;
    }
    if (game.snakePos.some(pos => pos.x === field.x && pos.y === field.y)) {
      return FieldType.SNAKE;
    }
    return FieldType.EMPTY;
  }

  getRandomField(width: number, height: number): { x: number; y: number } {
    return {
      x: Math.floor(width * Math.random()),
      y: Math.floor(height * Math.random())
    };
  }

  newGame(): void {
    const width = 40;
    const height = 33;
    const food = this.getRandomField(width, height);
    const snakePos = [this.getRandomField(width, height)];

    this.game$ = new BehaviorSubject<GameState>({
      food,
      snakePos,
      height,
      width,
      lost: false
    });
    let object2 : GameState;
           this.snakeService.getSnakeGameState().subscribe((data: any) => {
             object2 = data;
            console.log(object2);
            });
            //console.log(object2.snakePos.values);
    this.tick$
      .pipe(
        map(tick => {
          const game = this.game$.value;
          const direction = this.direction$.value;
          const nextField = this.getNextField(game, direction);
          const nextFieldType = this.getFieldType(nextField, game);


           
           this.snakeService.getSnakeGameState().subscribe((data: any) => {
            console.log(data.b);
            
             //console.log(this.obj['snakePos']);
             //console.log(Object.values(this.obj.snakePos));
           });



          //  let object2 : GameState;
          //  this.snakeService.getSnakeGameState().subscribe((data: GameState) => {
          //     object2 = data;
          //     console.log(JSON.stringify(object2));
          //   });
          switch (nextFieldType) {
            case FieldType.EMPTY:
              game.snakePos = [...game.snakePos.slice(1), nextField];
              break;
            case FieldType.FOOD:
              game.snakePos = [...game.snakePos, nextField];
              game.food = this.getRandomField(game.width, game.height);
              let loop = true;
              while (loop){
                for (let x = 0; x < game.snakePos.length; x++)
                {
                  if (game.snakePos[x].x === game.food.x && game.snakePos[x].y === game.food.y)
                  {
                    game.food = this.getRandomField(game.width, game.height);
                  }
                  else
                  {
                    loop = false;
                  }
              }
            }
              break;
            case FieldType.SNAKE:
              game.lost = true;
              break;
          }
          this.sendSnakeGameState();
          return game;
        }),
        takeUntil(this.lost$)
      )
      .subscribe(game => {
        this.game$.next(game);
        if (game.lost) {
          this.finalScore.gamesId = 1;
          this.finalScore.score = (game.snakePos.length * 100) -100;
          this.finalScore.userId = parseInt(sessionStorage.getItem('userId'));
          this.partyGameApi.addscore(this.finalScore).subscribe();
          this.partyGameApi.updateSnakeStats(this.finalScore).subscribe();
          this.lost$.next();
        }
      });
  }

  getGameList()
  {
    this.partyGameApi.getGames().subscribe((response: IGame[]) => { this.games = response });
  }

  showGame() {
    let p_game = this.games.find(g => g.id == this.currentGameId).name;
    this.mainScreen = p_game;
  }

  resetScreen() {
    this.mainScreen = "default";
  }

}


