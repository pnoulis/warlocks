import "./globals.js";
import { createIncomingMessageHandler } from "./handle-incoming-message.js";

debug("hello warlocks client");

const state = {
  id: null,
  players: new Map(),
};

const gameCanvas = document.getElementById("game");
if (!gameCanvas) throw new Error("No element with id `game`");
gameCanvas.width = g.constants.WORLD_WIDTH;
gameCanvas.height = g.constants.WORLD_HEIGHT;
const ctx = gameCanvas.getContext("2d");
if (!ctx) throw new Error("2D canvas is not supported");
state.canvas = gameCanvas;
state.canvasRect = gameCanvas.getBoundingClientRect();

const ws = new WebSocket("ws://localhost:6970");

// Server Events
ws.addEventListener("close", (event) => {
  g.debug(`[WEBSOCKET CLOSE]`, event);
  alert("[WEBSOCKET CLOSED]");
});
ws.addEventListener("error", (event) => {
  g.debug(`[WEBSOCKET ERROR]`, event);
  alert("[WEBSOCKET ERROR]");
});
ws.addEventListener("open", (event) => {
  g.debug("[WEBSOCKET OPEN]");
});
ws.addEventListener("message", createIncomingMessageHandler(state, ws));

function gameLoop() {
  let previousTimestamp = Date.now();

  g.window.requestAnimationFrame(frame);

  function frame(timestamp) {
    const deltaTime = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    state.players.forEach((player) => {
      player.updatePosition(deltaTime);
      ctx.fillRect(
        player.x,
        player.y,
        g.constants.PLAYER_SIZE,
        g.constants.PLAYER_SIZE
      );
    });
    window.requestAnimationFrame(frame);
  }
}

gameLoop();
