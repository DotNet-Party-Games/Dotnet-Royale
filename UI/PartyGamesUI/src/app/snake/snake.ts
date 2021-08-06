  import { InputKey, getInputKey } from './input';
  import { defaultMap, randomFood, updateMap, InBounds } from './map';
  import { Direction,Food, Snake, SnakeSegment, Game, GameState } from './models';
  

  export function defaultGameState(): GameState {
    return {
      game: defaultGame(),
      directions: [Direction.East],
      shouldRender: true,
    };
  }

  function defaultGame(): Game {
    const food = defaultFood();
    const snake = defaultSnake();
    const map = updateMap(defaultMap(),snake,food);
    const gameOver = false;
    return {snake,map,food,gameOver};
  }

  function defaultSnake(): Snake {
    const segments = [{i:0, j:0}, {i:0,j:1}, {i:0,j:2}];
    return {
      direction : Direction.East,
      head: segments[segments.length -1],
      length: segments.length,
      segments,
      foodEaten:false,
    };
  }

  function defaultFood(): Food{
    return {i:0,j:10};
  }

  function SnakeDirection (current: Direction, next: Direction): boolean {
    let result = false;
    if (next!==Direction.None){
      switch (current) {
        case Direction.North:
          result = next !== Direction.South;
          break;
        case Direction.East:
          result = next !== Direction.West;
          break;
        case Direction.South:
          result = next !== Direction.North;
          break;
        case Direction.West:
          result = next !== Direction.East;
          break;
        case Direction.None:
          result = false;
          break;
      }
    }
    return result;
  }

  function SnakeHeadLocation(snake: Snake): SnakeSegment {
    const head = snake.head;
    let newHead: SnakeSegment;
    switch (snake.direction) {
      case Direction.North:
        newHead = { i: head.i-1, j: head.j};
        break;
      case Direction.East:
        newHead = { i:head.i, j:head.j+1};
        break;
      case Direction.South:
        newHead = {i:head.i+1, j:head.j};
        break;
      case Direction.West:
        newHead = {i:head.i, j:head.j-1};
        break;
    }
    return newHead;
  }

  function MovementDirection(snake:Snake, direction: Direction): Snake {
    if (SnakeDirection(snake.direction, direction)){
      snake = {
        ...snake,
        direction,
      };
    }
    const newHead = SnakeHeadLocation(snake);
    snake.segments = [...snake.segments, newHead];
    return {
      ...snake,
      head: newHead,
      segments: snake.segments,
      length: snake.segments.length,
    };
  }

  function FoodConsumed(snake: Snake, food: Food) : Snake {
    const foodEaten = snake.head.i == food.i && snake.head.j == food.j;
    let segments = snake.segments;

    let [tail, ...rest] = snake.segments;
    if (!foodEaten){
      segments = rest;
    }

    return {
      ...snake,
      foodEaten,
      segments,
      length: segments.length,
    };
  }

  function GameOver(game: Game): boolean{
    const { snake, snake: {head}} = game;
    //Game is over if not InBounds(outside of the game window or snake hits another part of snake).
    return !InBounds(game.map,head.i,head.j) || snake.segments.some(segment => segment !== head && segment.i === head.i && segment.j === head.j);
  }

  function tick(game: Game, direction: Direction): Game 
  {
    game = { ...game, snake: MovementDirection(game.snake, direction)};
    game = { ...game, snake: FoodConsumed(game.snake, game.food)};
    game = { ...game, food: randomFood(game,game.snake.foodEaten)};
    game = { ...game, gameOver: GameOver(game)};
    
    //If game isn't over will continue to update the game map
    if(!game.gameOver)
    {
      game = { ...game, map: updateMap(game.map,game.snake,game.food)};
    }
    return game;
  }

  export function tickReducer(state:GameState): GameState{
    const[currentDirection, nextDirection, ...rest] = state.directions;
    let direction = currentDirection;
    if(nextDirection != undefined)
    {
      direction=nextDirection;
    }
    const directions = state.directions.length == 1 ? state.directions : [nextDirection, ...rest];
    
    const game = tick(state.game, direction);
    return {
      ...state, 
      game, 
      directions,
      shouldRender: true,
    };
  }

  function DirectionOnInput(inputKey: InputKey): Direction{
    let res: Direction = Direction.None;
    switch(inputKey)
    {
      case InputKey.Left:
        res = Direction.West;
        break;
      case InputKey.Right:
        res = Direction.East;
        break;
      case InputKey.Down:
        res = Direction.South;
        break;
      case InputKey.Up:
        res = Direction.North;
        break;
    }
    return res;
  }

  function getDirection(event: KeyboardEvent): Direction {
    const inputKey = getInputKey(event.keyCode);
    const newDirection = DirectionOnInput(inputKey);
    return newDirection;
  }
  
  export function directionReducer(state: GameState, event: KeyboardEvent): GameState
  {
    let result = state;
    const newDirection = getDirection(event);
    if(newDirection !== Direction.None)
    {
      result = { 
        ...state, 
        directions: [...state.directions, newDirection],
        shouldRender:false,
      };
    }
    return result;
  }

  export function renderGameMapOnConsole(state: GameState){
    if(state.shouldRender)
    {
      const map = state.game.map;
      const strGrid = map.grid
        .map((row) =>
          row 
            .map((item) =>
              item.isSnakeHead ? '@' : item.isSnake ? 'x' : item.isFood ? '*' : '.',
            )
            .join(' '),
        )
        .join('\n');
      console.log(strGrid + '\n');
    }
  }


