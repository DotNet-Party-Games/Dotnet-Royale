import { AppModule } from '../app.module'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Food, Snake, Map, Game, Tile } from './snake';


export const MapWidth = 20;
export const MapHeight = 20;

const SnakeFoodTile = {
  isFood: true,
  isSnake: false,
  isSnakeHead: false,
}
const SnakeSegmentTile = {
  isFood:false,
  isSnake: true,
  isSnakeHead: false,
}
const SnakeHeadTile = {
  isFood: false,
  isSnake: true,
  isSnakeHead: true,
}


export function defaultMap(): Map {
  const grid = emptyGrid();
  return {
    grid,
  };
}
function emptyGrid(): Tile[][] {
  return initGrid((i,j) => {
    return {isFood:false, isSnake:true, isSnakeHead:false};
  });
}
function initGrid(setItem: (i:number, j:number) => Tile):Tile[][] {
  const grid: Tile[][] = [];
  for (let i = 0; i < MapHeight; i++){
    grid[i] = [];
    for (let j= 0; j<MapWidth; j++){
      grid[i][j] = setItem(i,j);
    }
  }
  return grid;
}

export function updateMap(map: Map, snake: Snake, food: Food): Map {
  const grid = emptyGrid();
  grid[food.i][food.j] = SnakeFoodTile;
  snake.segments.forEach((segment) => {
    grid[segment.i][segment.j] = SnakeSegmentTile;
  });

  grid[snake.head.i][snake.head.j] = SnakeHeadTile;

  return {
      ...map,
      grid,
  };
}

export function InBounds(map: Map, i: number, j: number): boolean {
  let inBounds = i>=0 && i < MapHeight && j>=0 && j<MapWidth;
  return inBounds;
}

export function SnakeTile(map:Map, i:number, j:number): boolean {
  const tile = map.grid[i][j];
  return tile.isSnake;
}

function EmptyTile(map:Map, i:number, j:number): boolean {
  const tile = map.grid[i][j];
  return !tile.isFood && !tile.isSnake && !tile.isSnakeHead;
}

export function randomFood(game: Game, findNew = true): Food {
  let food = game.food;
  if (findNew){
    while (true){
      const i = Math.floor(Math.random()*MapHeight);
      const j = Math.floor(Math.random()* MapWidth);
      if (EmptyTile(game.map,i,j)){
        food = {i, j};
        break;
      }
    }
  }
  return food;
}



platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
  
    // custom stuff...
    const meta = document.createElement('meta');
    meta.setAttribute('content', "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
    meta.setAttribute('name', 'viewport');
    const head = document.head;
    head.appendChild(meta);
  
    // Otherwise, log the boot error
  }).catch(err => console.error(err));