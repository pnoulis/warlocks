import { Player } from "warlocks-common/Player";

export function playerConnected(state, ws) {
  // Add connected player to the state
  const player = new Player(
    crypto.randomUUID(),
    Math.random() * g.constants.WORLD_WIDTH,
    Math.random() * g.constants.WORLD_HEIGHT,
    ws
  );

  state.players.set(player.id, player);
  state.eventQueue.push({
    type: g.MessageType.PLAYER_CONNECTED,
    player,
  });

  return player;
}
