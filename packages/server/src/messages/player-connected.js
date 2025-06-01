import { Message } from "./Message.js";

export function playerConnected(connection, player) {
  const msg = new Message(connection);
  msg.type = "PLAYER_INITIALIZE_STATE";
  msg.data = {
    id: player.id,
    x: player.x,
    y: player.y,
  };
  return msg;
}
