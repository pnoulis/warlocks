import { playerMoving } from "./messages/outgoing/player-moving.js";

export function handleOutgoingMessage(state, event) {
  g.debug(`[OUTGOING][${event.type}] ${event.player.id}`);
  switch (event.type) {
    case g.MessageType.PLAYER_MOVING:
      playerMoving(state, event);
      break;
    default:
      throw new Error(`[OUTGOING] Unrecognized event type: ${event.type}`, {
        cause: event,
      });
  }
}
