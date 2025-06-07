import { KeyMap } from "./keymap.js";

export function createKeyboardEventHandler(state, cb) {
  return handleKeyboardEvent;
  function handleKeyboardEvent(event) {
    const fn = KeyMap[event.key];
    if (!fn) return;
    event.preventDefault();
    cb(fn(event));
  }
}
