export function createIncomingMessageHandler(state, player) {
  return handleIncomingMessage;
  function handleIncomingMessage(event) {
    const { type, ...msg } = JSON.parse(event.toString());
    g.debug(`[INCOMING][${type}] ${msg.id}`);

    if (msg.id === player.id) {
      return state.eventQueue.push({
        type,
        msg,
        player,
      });
    }

    // Player has changed their UID, with potentially nefarious intent.
    state.eventQueue.push({
      type: g.MessageType.PLAYER_NAUGHTY,
      msg,
      player,
    });
  }
}
