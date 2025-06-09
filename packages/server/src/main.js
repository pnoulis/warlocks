import "./globals.js";
import { startupSequence } from "./startup-sequence.js";
import { shutdownSequence } from "./shutdown-sequence.js";
import { wss } from "./websocket-server.js";
import { playerConnected } from "./messages/incoming/player-connected.js";
import { createIncomingMessageHandler } from "./handle-incoming-message.js";
import { handleOutgoingMessage } from "./handle-outgoing-message.js";
import { playerDisconnected } from "./messages/incoming/player-disconnected.js";
import { removeProjectile, isCollidingCircle } from "warlocks-common/misc";

process.on("SIGINT", shutdownSequence);
process.on("SIGTERM", shutdownSequence);
process.on("unhandledRejection", (err) => {
  debug(err);
});
process.on("uncaughtException", (err) => {
  debug(err);
});

await startupSequence();

const state = {
  players: new Map(),
  projectiles: [],
  eventQueue: [],
};

wss.on("connection", (ws) => {
  const player = playerConnected(state, ws);
  ws.on("message", createIncomingMessageHandler(state, player));
  ws.on("close", () => playerDisconnected(state, player));
});

function gameLoop() {
  tick(0);
  function tick(previousTimestamp) {
    const now = Date.now();
    const deltaTime = (now - previousTimestamp) / 1000;
    previousTimestamp = now;

    const players = Array.from(state.players.values());
    const projectiles = state.projectiles;

    // Update player position
    for (let i = 0; i < players.length; i++) {
      players[i].updatePosition(deltaTime);
    }

    // Update projectile position
    for (let i = 0; i < projectiles.length; i++) {
      projectiles[i] && projectiles[i].updatePosition(deltaTime);
    }

    // Collision detection
    for (let i = 0; i < projectiles.length; i++) {
      if (projectiles[i] === null) continue;
      for (let y = 0; y < players.length; y++) {
        // Projectiles do not collide with their origin player.
        if (players[y].id === projectiles[i].uid) continue;

        // Non colliding projectile
        if (!isCollidingCircle(projectiles[i], players[y])) continue;

        // Colliding projectile
        state.eventQueue.push({
          type: g.MessageType.SKILLSHOT_COLLIDING,
          player: players[y],
          skillshot: projectiles[i],
        });
        removeProjectile(projectiles, i);
        break;
      }
    }

    try {
      for (const event of state.eventQueue) {
        handleOutgoingMessage(state, event);
      }
      state.eventQueue.length = 0;
    } catch (err) {
      g.debug(err);
      process.exit(0);
    }
    g.setTimeout(() => tick(now), 1000 / g.SERVER_FPS);
  }
}

gameLoop();
