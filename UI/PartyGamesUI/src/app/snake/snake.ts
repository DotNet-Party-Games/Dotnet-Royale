export interface Snake {
    head: SnakePart;
    parts: SnakePart[];
    direction: Direction;
    length: number;
    foodEaten: boolean;
  }

  export interface SnakePart {
    i: number;
    j: number;
  }
export enum Direction {
    LEFT,
    UP,
    RIGHT,
    DOWN
}

