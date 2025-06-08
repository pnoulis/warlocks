import { playerIntentsMoving } from "./messages/outgoing/player-intents-moving.js";
import { playerIntentsSkillshot } from "./messages/outgoing/player-intents-skillshot.js";

export function handleOutgoingMessage(state, event) {
  g.debug(`[OUTGOING][${event.type}] ${event.player.id}`);
  switch (event.type) {
    case g.MessageType.PLAYER_INTENTS_MOVING:
      playerIntentsMoving(state, event);
      break;
    case g.MessageType.PLAYER_INTENTS_SKILLSHOT:
      playerIntentsSkillshot(state, event);
      break;
    default:
      throw new Error(`[OUTGOING] Unrecognized event type: ${event.type}`, {
        cause: event,
      });
  }
}
