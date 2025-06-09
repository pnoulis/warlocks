import { PLAYER_SPEED, PLAYER_RADIUS } from "./constants.js";

export class Player {
  constructor(id, x, y, ws) {
    this.id = id;
    this.radius = PLAYER_RADIUS;
    this.x = x;
    this.y = y;
    this.targetX = 0;
    this.targetY = 0;
    this.ws = ws;
  }

  updatePosition(deltaTime) {
    // Compute distance to target
    if (!this.targetX) return;
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.hypot(dx, dy);

    // If close enough, snap to target and stop moving
    if (distance < 1) {
      this.x = this.targetX;
      this.y = this.targetY;
      return;
    }

    // Normalize direction vector
    const directionX = dx / distance;
    const directionY = dy / distance;

    // Move by speed * deltaTime
    const moveDistance = PLAYER_SPEED * deltaTime;
    this.x += directionX * moveDistance;
    this.y += directionY * moveDistance;
  }
}
