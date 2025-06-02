import { Player } from "warlocks-common/Player";

export class ServerPlayer extends Player {
  constructor(ws) {
    super(crypto.randomUUID(), Math.random() * globalThis.WORLD_WIDTH, Math.random() * globalThis.WORLD_HEIGH);
    this.ws = ws;
  }
}
