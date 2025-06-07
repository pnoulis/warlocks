export function playerConnected(state, event) {
  const connectedPlayer = event.player;

  const msg = JSON.stringify({
    // Each other player will receive a PLAYER_JOINED event.
    // The connected player will receive a PLAYER_JOINED event for each other
    // player.
    type: g.MessageType.PLAYER_JOINED,
    id: connectedPlayer.id,
    x: connectedPlayer.x,
    y: connectedPlayer.y,
  });

  // Connected player is instructed to add his position in his state
  connectedPlayer.ws.send(
    JSON.stringify({
      type: event.type,
      id: connectedPlayer.id,
      x: connectedPlayer.x,
      y: connectedPlayer.y,
    })
  );

  for (const otherPlayer of state.players.values()) {
    if (otherPlayer.id === connectedPlayer.id) continue;

    // Connected player is instructed to add every other player's position in
    // his state
    connectedPlayer.ws.send(
      JSON.stringify({
        type: g.MessageType.PLAYER_JOINED,
        id: otherPlayer.id,
        x: otherPlayer.x,
        y: otherPlayer.y,
      })
    );

    // Other players are instructed to add connected player's position in their
    // state
    otherPlayer.ws.send(msg);
  }
}
