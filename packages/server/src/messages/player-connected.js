export function playerConnected(event, state, connectedPlayer) {
  const msg = JSON.stringify({
    type: event.type,
    id: connectedPlayer.id,
    x: connectedPlayer.x,
    y: connectedPlayer.y,
  });

  connectedPlayer.ws.send(msg);

  return msg;
}
