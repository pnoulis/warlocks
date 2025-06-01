import "./globals.js";
import * as common from "warlocks-common/constants";
import { handleServerMessage } from "./handle-server-message.js";

debug("hello warlocks client");

const state = {
  id: null,
  players: new Map(),
};

(async () => {
  const gameCanvas = document.getElementById("game");
  if (!gameCanvas) throw new Error("No element with id `game`");

  gameCanvas.width = common.WORLD_WIDTH;
  gameCanvas.height = common.WORLD_HEIGHT;

  const ctx = gameCanvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas is not supported");

  const ws = new WebSocket("ws://localhost:6970");
  ws.addEventListener("close", (event) => {
    debug(`[WEBSOCKET CLOSE]`, event);
  });
  ws.addEventListener("error", (event) => {
    debug(`[WEBSOCKET ERROR]`, event);
  });

  ws.addEventListener("message", (event) => {
    handleServerMessage(ws, state, event);
  });

  ws.addEventListener("open", (event) => {
    debug(`[WEBSOCKET OPEN]`);
  });

  let previousTimestamp = 0;
  const frame = (timestamp) => {
    const deltaTime = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "red";
    state.players.forEach((player) => {
      ctx.fillRect(player.x, player.y, common.PLAYER_SIZE, common.PLAYER_SIZE);
    });

    window.requestAnimationFrame(frame);
  };

  window.requestAnimationFrame((timestamp) => {
    previousTimestamp = timestamp;
    window.requestAnimationFrame(frame);
  });
})();
