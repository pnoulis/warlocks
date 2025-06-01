import "./globals.js";
import { startupSequence } from "./startup-sequence.js";
import { shutdownSequence } from "./shutdown-sequence.js";
import { wss } from "./websocket-server.js";
import { ServerPlayer } from "./ServerPlayer.js";
import { Timings } from "./Timings.js";
import MsgType from "warlocks-common/message-type-enum";
import { handleClientMessage } from "./handle-client-message.js";

// As soon as somebody connects, we want to register the client and
// map them with their state
// sharing the state between server and clients.
// The client does not know the server side sockets.
// it is not a reliable way to identify the players.
// There needs to be some sort of id in the player.

// Pass the player id to the client

process.on("SIGINT", shutdownSequence);
process.on("SIGTERM", shutdownSequence);
process.on("unhandledRejection", (err) => {
  debug(err);
});
process.on("uncaughtException", (err) => {
  debug(err);
});

await startupSequence();

const players = new Map();
const eventQueue = [];

wss.on("connection", (ws) => {
  const player = new ServerPlayer(ws);
  players.set(player.id, player);

  eventQueue.push({
    type: MsgType.PLAYER_JOINED,
    id: player.id,
    x: player.x,
    y: player.y,
  });

  ws.on("message", (event) => {
    const msg = JSON.parse(event);
    if (msg.id === player.id) return eventQueue.push(msg);

    // Player is doing naughty stuff by pretending they are someone
    // else through a different ID (could just be a something else
    // though)
    eventQueue.push({
      type: MsgType.PLAYER_NAUGHTY,
      id: player.id,
    });
  });

  ws.on("close", () => {
    eventQueue.push({
      type: MsgType.PLAYER_DISCONNECTED,
      id: player.id,
    });
  });
});

function gameLoop() {
  for (const event of eventQueue) {
    handleClientMessage(event, { players });
  }
  eventQueue.length = 0;
  globalThis.setTimeout(gameLoop, 1000 / globalThis.SERVER_FPS);
}

globalThis.setTimeout(gameLoop, 1000 / globalThis.SERVER_FPS);
