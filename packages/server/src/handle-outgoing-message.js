import { playerConnected } from "./messages/outgoing/player-connected.js";
import { playerDisconnected } from "./messages/outgoing/player-disconnected.js";
import { playerMoving } from "./messages/outgoing/player-moving.js";
import { playerNaughty } from "./messages/outgoing/player-naughty.js";
import { playerSkillshot } from "./messages/outgoing/player-skillshot.js";
import { skillshotColliding } from "./messages/outgoing/skillshot-colliding.js";

export function handleOutgoingMessage(state, event) {
  debug(`[OUTGOING][${event.type}] ${event.player.id}`);
  switch (event.type) {
    case g.MessageType.PLAYER_CONNECTED:
      playerConnected(state, event);
      break;
    case g.MessageType.PLAYER_DISCONNECTED:
      playerDisconnected(state, event);
      break;
    case g.MessageType.PLAYER_MOVING:
      playerMoving(state, event);
      break;
    case g.MessageType.PLAYER_SKILLSHOT:
      playerSkillshot(state, event);
      break;
    case g.MessageType.PLAYER_NAUGHTY:
      playerNaughty(state, event);
      break;
    case g.MessageType.SKILLSHOT_COLLIDING:
      skillshotColliding(state, event);
      break;
    default:
      throw new Error(`[OUTGOING] Unrecognized message type: ${event.type}`, {
        cause: event,
      });
  }
}
