import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  interval,
  Observable,
  Subject
} from "rxjs";
import { distinctUntilChanged, map, takeUntil, tap } from "rxjs/operators";
import { IGame } from '../services/game';
export interface GameState {
  width: number;
  height: number;
  snakePos: { x: number; y: number }[];
  food: { x: number; y: number };
  lost: boolean;
  snakePos2: {x: number; y: number}[];
}
import { PartygameService } from '../services/partygame.service';
import { DataService } from '../services/data.service';
import { IScore } from '../services/score';
import { SnakeService } from '../services/snake/snake.service';
import { ILoggedUser } from '../services/user';
import { Router } from '@angular/router';
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
  snakePositionDisplay: {x: number; y: number}[];
  SnakeGameStateAtX: {x: number; y: number}[];
  SnakeGameStateAtY: {x: number; y: number}[];
  SnakeGameState: {x: number; y: number}[];
  SnakeGameState2: {x: number; y: number}[];

  constructor(private router: Router, private partyGameApi: PartygameService, private data: DataService, private snakeService : SnakeService)
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
    this.roomId = '1';
    this.currentUser.userName = "steven";
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
    if (game.snakePos2 != undefined)
      {
        if (game.snakePos2.some(pos => pos.x === field.x && pos.y === field.y)) {
          return FieldType.SNAKE;
        }
      }
    return FieldType.EMPTY;
  }

  getRandomField(width: number, height: number): { x: number; y: number } {
    return {
      x: Math.floor(width * Math.random()),
      y: Math.floor(height * Math.random())
    };
  }
  currentfood: { x: number; y: number };
  newGame(): void {
    const width = 40;
    const height = 33;
    const food = this.getRandomField(width, height);
    const snakePos = [this.getRandomField(width, height)];
    let snakePos2;
    this.game$ = new BehaviorSubject<GameState>({
      food,
      snakePos,
      height,
      width,
      lost: false,
      snakePos2
    });
    
    this.tick$
      .pipe(
        map(tick => {
          this.sendSnakeGameState();
          this.snakeService.getSnakeGameState();
          this.snakeService.getSnakeFood();
          const subscription = this.snakeService.currentGameState.subscribe(data => (this.SnakeGameState = data.map(a=>a)));
          const subscription1 = this.snakeService.currentFood.subscribe(data => this.currentfood = data);
          
          let game = this.game$.value;
          if (this.SnakeGameState != undefined)
          {
            
            game.snakePos2 = this.SnakeGameState;
            this.snakePositionDisplay = [].concat(game.snakePos, this.SnakeGameState);
           
          }
          subscription.unsubscribe();
        
          const direction = this.direction$.value;
          const nextField = this.getNextField(game, direction);
          const nextFieldType = this.getFieldType(nextField, game);
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
          subscription1.unsubscribe();
          this.sendSnakeGameState();
          this.snakeService.getSnakeGameState();
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
    location.reload();
  }

  goToRoom(){
    this.router.navigate(['/room']);
  }

}
