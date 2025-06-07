import { Player } from "warlocks-common/Player";

export function playerJoined(state, msg) {
  // Add joined player to the state
  const player = new Player(msg.id, msg.x, msg.y);
  state.players.set(player.id, player);
}
