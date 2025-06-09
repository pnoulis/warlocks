export function addProjectile(projectiles, projectile) {
  let emptySlot = 0;
  for (emptySlot; emptySlot < projectiles.length; emptySlot++) {
    if (projectiles[emptySlot] === null) break;
  }
  if (emptySlot === projectiles.length) {
    projectiles.push(projectile);
  } else {
    projectiles[emptySlot] = projectile;
  }
}

export function removeProjectile(projectiles, i) {
  projectiles[i] = null;
}

export function isCollidingCircle(c1, c2) {
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;
  const distSq = dx * dx + dy * dy;
  const radiusSum = c1.radius + c2.radius;
  return distSq < radiusSum * radiusSum;
}
