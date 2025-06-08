export function playerSkillshot(state, event) {
  const skillshot = event.skillshot;
  const msg = JSON.stringify({
    type: g.MessageType.PLAYER_SKILLSHOT,
    id: skillshot.uid,
    skillshot,
  });

  state.players.forEach((player) => player.ws.send(msg));
}
