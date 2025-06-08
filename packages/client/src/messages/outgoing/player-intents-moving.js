export function playerIntentsMoving(state, event) {
  const player = event.player;
  const msg = JSON.stringify({
    type: event.type,
    id: player.id,
    targetX: event.mouse.clientX - state.canvasRect.x,
    targetY: event.mouse.clientY - state.canvasRect.y,
  });

  player.ws.send(msg);
}
