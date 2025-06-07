export function playerDisconnected(state, event) {
  const disconnectedPlayer = event.player;
  const msg = JSON.stringify({
    type: event.type,
    id: disconnectedPlayer.id,
  });

  // Disconnected player has already been removed from the state
  for (const otherPlayer of state.players.values()) {
    // Other players are instructed to remove the disconnected player
    // from their states.
    otherPlayer.ws.send(msg);
  }
}
