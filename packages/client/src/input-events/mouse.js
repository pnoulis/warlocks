import { KeyMap } from "./keymap";

export function createMouseEventHandler(cb) {
  return handleMouseEvent;
  function handleMouseEvent(event) {
    const fn = KeyMap[event.type];
    if (!fn) return;
    event.preventDefault();
    event.stopPropagation();
    cb(fn(event));
  }
}
