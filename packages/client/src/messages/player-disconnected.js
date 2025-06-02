export function playerDisconnected(ws, state, msg) {
  // Remove disconnected player from the state
  state.players.delete(msg.id);
}
