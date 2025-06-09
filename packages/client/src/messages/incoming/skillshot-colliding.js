export function skillshotColliding(state, msg) {
  const projectile = state.projectiles.find(
    (projectile) => msg.skillshot.id === projectile?.id
  );
  const player = state.players.get(msg.id);

  if (!projectile) throw new Error(`Missing projectile: ${msg.skillshot.id}`);

  // Synchronize server and client position of projectile
  Object.assign(projectile, msg.skillshot);
  projectile.colliding = true;

  // Synchronize server and client position of player
  player.x = msg.x;
  player.y = msg.y;
}
