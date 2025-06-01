export const Direction = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};

export const DIRECTION_VECTORS = {
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 },
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
};

export class Player {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.moving = {
      [Direction.LEFT]: false,
      [Direction.RIGHT]: false,
      [Direction.UP]: false,
      [Direction.DOWN]: false,
    };
  }

  update(deltaTime) {
    let dx = 0;
    let dy = 0;

    for (const direction in DIRECTION_VECTORS) {
      if (this.moving[direction]) {
        dx += DIRECTION_VECTORS[direction].x;
        dy += DIRECTION_VECTORS[direction].y;
      }
    }

    this.x += dx * deltaTime;
    this.y += dy * deltaTime;
  }
}
