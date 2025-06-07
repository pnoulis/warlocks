export function playerMoving(state, event) {
  const movingPlayer = event.player;
  const msg = JSON.stringify({
    type: event.type,
    ...event.msg,
  });

  // Moving player is updated
  movingPlayer.targetX = event.msg.targetX;
  movingPlayer.targetY = event.msg.targetY;

  for (const otherPlayer of state.players.values()) {
    if (otherPlayer.id === movingPlayer.id) continue;

    // Other players are instructed to update the moving player's state
    otherPlayer.ws.send(msg);
  }
}
