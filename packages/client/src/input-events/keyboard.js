import { KeyMap } from "./keymap.js";

export function createKeyboardEventHandler(state, cb) {
  document.addEventListener("keydown", handleKeyboardEvent);
  function handleKeyboardEvent(event) {
    const action = KeyMap[event.key];
    if (!action) return;

    event.preventDefault();
    event.stopPropagation();

    if (state.inputEventQueue.at(-1)?.type === action.type) {
      state.inputEventQueue.pop();
    }

    state.inputEventQueue.push({ ...action, kbd: event });
  }
}
