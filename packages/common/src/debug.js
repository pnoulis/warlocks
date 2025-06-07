import { isNode } from "./platform.js";

export function debug(...msg) {
  for (let i = 0; i < msg.length; i++) {
    if (typeof msg[i] === "string" || !isNode) {
      console.log(msg[i]);
      continue;
    }
    console.dir(msg[i], { depth: null });
  }
  return msg.length ? msg[0] : msg;
}
