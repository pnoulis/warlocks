export function playerNaughty(state, event) {
  const naughtyPlayer = event.player;
  const msg = JSON.stringify({
    type: g.MessageType.PLAYER_DISCONNECTED,
    id: naughtyPlayer.id,
  });

  // Close naughty player's connection
  naughtyPlayer.ws.close();

  // Remove naughty player from the game state.
  state.players.delete(naughtyPlayer.id);

  for (const otherPlayer of state.players.values()) {
    // Other players are instructed to remove the naughty player from their
    // states.
    otherPlayer.ws.send(msg);
  }
}
