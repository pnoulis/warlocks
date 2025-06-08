export function playerIntentsMoving(state, event) {
  const player = event.player;
  // Update the players state
  player.targetX = event.msg.targetX;
  player.targetY = event.msg.targetY;

  state.eventQueue.push({
    type: g.MessageType.PLAYER_MOVING,
    msg: event.msg,
    player,
  });
}
