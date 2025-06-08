import { PROJECTILE_SPEED } from "./constants.js";

export class Projectile {
  constructor(type, uid, x, y, directionX, directionY) {
    this.type = type;
    this.uid = uid;
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
  }

  updatePosition(deltaTime) {
    // Move by speed * deltaTime
    const moveDistance = PROJECTILE_SPEED * deltaTime;
    this.x += this.directionX * moveDistance;
    this.y += this.directionY * moveDistance;
  }
}
