import { KeyMap } from "./keymap";

export function createMouseEventHandler(state, cb) {
  document.addEventListener("click", handleMouseEvent);
  function handleMouseEvent(event) {
    const action = KeyMap[event.type];
    if (!action) return;

    event.preventDefault();
    event.stopPropagation();

    if (
      state.inputEventQueue.at(-1)?.type ===
      g.MessageType.PLAYER_INTENTS_SKILLSHOT
    ) {
      cb({ ...state.inputEventQueue.at(-1), mouse: event });
      state.inputEventQueue.pop();
    } else {
      cb({ ...action, mouse: event });
    }
  }
}
