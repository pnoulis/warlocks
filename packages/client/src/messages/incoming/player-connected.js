import { Player } from "warlocks-common/Player";
import { createKeyboardEventHandler } from "../../input-events/keyboard";
import { createMouseEventHandler } from "../../input-events/mouse";
import { handleOutgoingMessage } from "../../handle-outgoing-message";

export function playerConnected(state, msg, ws) {
  // Add the client user to the state.
  const player = new Player(msg.id, msg.x, msg.y, ws);
  state.id = player.id;
  state.players.set(player.id, player);

  // Keyboard input
  document.addEventListener(
    "keydown",
    createKeyboardEventHandler((event) => {
      handleOutgoingMessage(state, { ...event, player });
    })
  );
  // Mouse input
  document.addEventListener(
    "click",
    createMouseEventHandler((event) => {
      handleOutgoingMessage(state, { ...event, player });
    })
  );
}
