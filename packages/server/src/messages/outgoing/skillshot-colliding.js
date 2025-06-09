export function skillshotColliding(state, event) {
  const player = event.player;
  const skillshot = event.skillshot;
  const msg = JSON.stringify({
    type: g.MessageType.SKILLSHOT_COLLIDING,
    id: player.id,
    x: player.x,
    y: player.y,
    skillshot: {
      id: skillshot.id,
      uid: skillshot.uid,
      type: skillshot.type,
      x: skillshot.x,
      y: skillshot.y,
      directionX: skillshot.directionX,
      directionY: skillshot.directionY,
    },
  });

  // All players are instructed to update their state
  state.players.forEach((player) => player.ws.send(msg));
}
