import { PROJECTILE_SPEED, PROJECTILE_RADIUS } from "./constants.js";

export class Projectile {
  constructor(id, type, uid, x, y, directionX, directionY) {
    this.id = id;
    this.type = type;
    this.uid = uid;
    this.radius = PROJECTILE_RADIUS;
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
