import MsgType from "warlocks-common/message-type-enum";

export function playerDisconnected(ws, state, msg) {
  // Remove disconnected player from the state
  state.players.delete(msg.id);
}
