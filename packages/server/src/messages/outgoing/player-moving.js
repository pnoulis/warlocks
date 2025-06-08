export function playerMoving(state, event) {
  const movingPlayer = event.player;
  const msg = JSON.stringify({
    type: event.type,
    id: movingPlayer.id,
    targetX: event.msg.targetX,
    targetY: event.msg.targetY,
    x: movingPlayer.x,
    y: movingPlayer.y,
  });

  // All players including the one expressed an intent to move are instructed to
  // update their state.
  state.players.forEach((player) => player.ws.send(msg));
}
