export function playerMoving(event, state, movingPlayer) {
  const msg = JSON.stringify({
    type: event.type,
    id: movingPlayer.id,
    start: "",
    direction: "",
  });
}
