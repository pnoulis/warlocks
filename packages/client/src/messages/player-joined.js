import { Player } from "warlocks-common/Player";

export function playerJoined(ws, state, msg) {
  state.id = msg.id;
  const players = state.players;
  const joinedPlayer = new Player(msg.id, msg.x, msg.y);
  players.set(joinedPlayer.id, joinedPlayer);
}
