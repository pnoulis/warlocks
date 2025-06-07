export function playerMoving(state, msg) {
  // Update player's position
  const movingPlayer = state.players.get(msg.id);
  movingPlayer.targetX = msg.targetX;
  movingPlayer.targetY = msg.targetY;
}
