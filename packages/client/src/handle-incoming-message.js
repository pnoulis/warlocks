import { playerConnected } from "./messages/incoming/player-connected.js";
import { playerDisconnected } from "./messages/incoming/player-disconnected.js";
import { playerJoined } from "./messages/incoming/player-joined.js";
import { playerMoving } from "./messages/incoming/player-moving.js";
import { playerSkillshot } from "./messages/incoming/player-skillshot.js";
import { skillshotColliding } from "./messages/incoming/skillshot-colliding.js";

export function createIncomingMessageHandler(state, ws) {
  return handleIncomingMessage;
  function handleIncomingMessage(event) {
    const { type, ...msg } = JSON.parse(event.data);
    g.debug(`[INCOMING][${type}] ${msg.id}`);

    switch (type) {
      case g.MessageType.PLAYER_CONNECTED:
        playerConnected(state, msg, ws);
        break;
      case g.MessageType.PLAYER_DISCONNECTED:
        playerDisconnected(state, msg);
        break;
      case g.MessageType.PLAYER_JOINED:
        playerJoined(state, msg);
        break;
      case g.MessageType.PLAYER_MOVING:
        playerMoving(state, msg);
        break;
      case g.MessageType.PLAYER_SKILLSHOT:
        playerSkillshot(state, msg);
        break;
      case g.MessageType.SKILLSHOT_COLLIDING:
        skillshotColliding(state, msg);
        break;
      default:
        ws.close();
        throw new Error(`[INCOMING] Unrecognized message type: ${type}`, {
          cause: msg,
        });
    }
  }
}
