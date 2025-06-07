export function playerMoving(state, msg) {
  // Update player's position
  state.players.get(msg.id).moving = msg.moving;
}
