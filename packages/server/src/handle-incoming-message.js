import { playerIntentsMoving } from "./messages/incoming/player-intents-moving";

export function createIncomingMessageHandler(state, player) {
  return handleIncomingMessage;
  function handleIncomingMessage(event) {
    const { type, ...msg } = JSON.parse(event.toString());
    g.debug(`[INCOMING][${type}] ${msg.id}`);

    // Player has changed their UID, with potentially nefarious intent.
    if (msg.id !== player.id)
      return state.eventQueue.push({
        type: g.MessageType.PLAYER_NAUGHTY,
        msg,
        player,
      });

    switch (type) {
      case g.MessageType.PLAYER_INTENTS_MOVING:
        playerIntentsMoving(state, { type, msg, player });
        break;
      default:
        state.eventQueue.push({ type, msg, player });
    }
  }
}
