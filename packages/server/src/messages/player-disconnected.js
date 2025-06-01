export function playerDisconnected(event, state, disconnectedPlayer) {
  const msg = JSON.stringify({
    type: event.type,
    id: disconnectedPlayer.id,
  });

  // Disconnected player is removed from the game state.
  state.players.delete(disconnectedPlayer.id);

  for (const otherPlayer of state.players.values()) {
    // Other players are instructed to remove the disconnected player
    // from their states.
    otherPlayer.ws.send(msg);
  }
}
