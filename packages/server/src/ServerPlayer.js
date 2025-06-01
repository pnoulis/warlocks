import { Player } from "warlocks-common/Player";

export class ServerPlayer extends Player {
  constructor(ws) {
    super({
      id: crypto.randomUUID(),
      x: Math.random() * globalThis.WORLD_WIDTH,
      y: Math.random() * globalThis.WORLD_HEIGH,
    });
    this.ws = ws;
  }
}
