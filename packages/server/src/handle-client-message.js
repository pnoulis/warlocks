import MsgType from "warlocks-common/message-type-enum";
import { playerConnected } from "./messages/player-connected.js";
import { playerDisconnected } from "./messages/player-disconnected.js";
import { playerJoined } from "./messages/player-joined.js";
import { playerMoving } from "./messages/player-moving.js";

export function handleClientMessage(event, state) {
  debug(`[${event.type}] ${event.id}`);
  const player = state.players.get(event.id);

  if (!player) {
    debug(`[TICK] Missing player: ${event.id}`);
    return;
  }

  switch (event.type) {
    case MsgType.PLAYER_CONNECTED:
      playerConnected(event, state, player);
      break;
    case MsgType.PLAYER_DISCONNECTED:
      playerDisconnected(event, state, player);
      break;
    case MsgType.PLAYER_JOINED:
      playerJoined(event, state, player);
      break;
    case MsgType.PLAYER_MOVING:
      playerMoving(event, state, player);
      break;
    default:
      throw new Error(`[TICK] Unrecognized message type: ${event.type} `);
  }
}
