export function playerIntentsSkillshot(state, event) {
  const player = event.player;
  const targetX = event.mouse.clientX - state.canvasRect.x;
  const targetY = event.mouse.clientY - state.canvasRect.y;
  const dx = targetX - player.x;
  const dy = targetY - player.y;
  const distance = Math.hypot(dx, dy);
  const msg = JSON.stringify({
    type: event.type,
    id: player.id,
    skillshot: event.msg.skillshot,
    x: player.x,
    y: player.y,
    directionX: dx / distance,
    directionY: dy / distance,
  });
  player.ws.send(msg);
}
