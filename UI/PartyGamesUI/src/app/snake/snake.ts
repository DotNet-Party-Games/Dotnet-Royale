  import { InputKey, getInputKey } from './input';
  import { defaultMap, randomFood, updateMap, InBounds } from './map';
  
  
  export interface SnakeSegment {
    i: number;
    j: number;
  }
  
  export interface Snake {
    head: SnakeSegment;
    segments: SnakeSegment[];
    direction: Direction;
    length:number;
    foodEaten: boolean;
  }
  export enum Direction{
    None = -1,
    North = 0,
    East = 1,
    South = 2,
    West = 3,
  }
  export interface Food {
    i: number;
    j: number;
  }
  export interface Map {
    grid: Tile[][];
  }
  export interface Tile {
    isFood: boolean;
    isSnake: boolean;
    isSnakeHead: boolean;
  }
  export interface Game {
    snake: Snake;
    map: Map;
    food: Food;
    gameOver: boolean;
  }
  export interface GameState {
    game: Game;
    directions: Direction[];
    shouldRender: boolean;
  }

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



