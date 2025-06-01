export function playerJoined(event, state, joinedPlayer) {
  const msg = JSON.stringify({
    type: event.type,
    id: joinedPlayer.id,
    x: joinedPlayer.x,
    y: joinedPlayer.y,
  });

  // Joined player is instructed to add his own position in his state.
  joinedPlayer.ws.send(msg);

  for (const otherPlayer of state.players.values()) {
    if (otherPlayer.id === joinedPlayer.id) continue;

    // Joined player is instructed to add every other player's
    // position in his state.
    joinedPlayer.ws.send(
      JSON.stringify({
        type: event.type,
        id: otherPlayer.id,
        x: otherPlayer.x,
        y: otherPlayer.y,
      })
    );

    // Other players are instructed to add the joined player's
    // position in their state.
    otherPlayer.ws.send(msg);
  }

  return msg;
}
