export function playerDisconnected(state, msg) {
  // Remove disconnected player from the state
  state.players.delete(msg.id);
}
