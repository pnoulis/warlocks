export function playerDisconnected(state, player) {
  // Remove disconnected player from the game state
  state.players.delete(player.id);

  state.eventQueue.push({
    type: g.MessageType.PLAYER_DISCONNECTED,
    player,
  });
}
