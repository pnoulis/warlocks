import MsgType from "warlocks-common/message-type-enum";
import { playerJoined } from "./messages/player-joined.js";
import { playerConnected } from "./messages/player-connected.js";
import { playerDisconnected } from "./messages/player-disconnected.js";

export function handleServerMessage(ws, state, event) {
  let msg;

  try {
    msg = JSON.parse(event.data);
  } catch (err) {
    throw new Error("[WEBSOCKET MSG] Failed to parse WebSocket message");
    ws.close();
  }

  debug(`[${msg.type}]`);
  switch (msg.type) {
    case MsgType.PLAYER_CONNECTED:
      playerConnected(ws, state, msg);
      break;
    case MsgType.PLAYER_DISCONNECTED:
      playerDisconnected(ws, state, msg);
      break;
    case MsgType.PLAYER_JOINED:
      playerJoined(ws, state, msg);
      break;
    default:
      ws.close();
      throw new Error(`[WEBSOCKET MSG] Unrecognized message type: ${msg.type}`, { cause: msg });
  }
}
