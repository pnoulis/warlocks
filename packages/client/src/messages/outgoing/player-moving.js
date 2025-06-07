export function playerMoving(state, event) {
  const player = event.player;

  player.targetX = event.mouse.clientX - state.canvasRect.x;
  player.targetY = event.mouse.clientY - state.canvasRect.y;

  const msg = JSON.stringify({
    type: event.type,
    id: player.id,
    targetX: player.targetX,
    targetY: player.targetY,
  });

  player.ws.send(msg);
}
