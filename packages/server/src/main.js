import "./globals.js";
import { startupSequence } from "./startup-sequence.js";
import { shutdownSequence } from "./shutdown-sequence.js";
import { wss } from "./websocket-server.js";
import { playerConnected } from "./messages/incoming/player-connected.js";
import { createIncomingMessageHandler } from "./handle-incoming-message.js";
import { handleOutgoingMessage } from "./handle-outgoing-message.js";
import { playerDisconnected } from "./messages/incoming/player-disconnected.js";

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
  eventQueue: [],
};

wss.on("connection", (ws) => {
  const player = playerConnected(state, ws);
  ws.on("message", createIncomingMessageHandler(state, player));
  ws.on("close", () => playerDisconnected(state, player));
});

function gameLoop() {
  try {
    for (const event of state.eventQueue) {
      handleOutgoingMessage(state, event);
    }
    state.eventQueue.length = 0;
  } catch (err) {
    g.debug(err);
  }
  g.setTimeout(gameLoop, 1000 / g.SERVER_FPS);
}

gameLoop();
