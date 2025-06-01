export function debug(msg) {
  if (typeof msg === "string") {
    console.log(msg);
  } else {
    console.dir(msg, { depth: null });
  }
  return msg;
}
