import { Direction, DIRECTION_VECTORS } from "./direction.js";

export class Player {
  constructor(id, x, y, ws) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.moving = {
      [Direction.LEFT]: false,
      [Direction.RIGHT]: false,
      [Direction.UP]: false,
      [Direction.DOWN]: false,
    };
    this.ws = ws;
  }

  updatePosition(deltaTime) {
    let dx = 0;
    let dy = 0;

    for (const direction in DIRECTION_VECTORS) {
      if (this.moving[direction]) {
        dx += DIRECTION_VECTORS[direction].x;
        dy += DIRECTION_VECTORS[direction].y;
      }
    }

    this.x += dx * (deltaTime + 0.5);
    this.y += dy * (deltaTime + 0.5);
  }
}
