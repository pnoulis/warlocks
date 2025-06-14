import "./globals.js";
import { createIncomingMessageHandler } from "./handle-incoming-message.js";
import { removeProjectile } from "warlocks-common/misc";

debug("hello warlocks client");

const state = {
  id: null,
  players: new Map(),
  projectiles: [],
  inputEventQueue: [],
};

const gameCanvas = document.getElementById("game");
if (!gameCanvas) throw new Error("No element with id `game`");
gameCanvas.width = g.constants.WORLD_WIDTH;
gameCanvas.height = g.constants.WORLD_HEIGHT;
const ctx = gameCanvas.getContext("2d");
if (!ctx) throw new Error("2D canvas is not supported");
state.canvas = gameCanvas;
state.canvasRect = gameCanvas.getBoundingClientRect();
debug(state.canvasRect);

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
  let collisionCandidates = [];
  let players;
  let projectiles;
  let i = 0;

  g.window.requestAnimationFrame(frame);

  function frame(timestamp) {
    const deltaTime = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    players = Array.from(state.players.values());
    projectiles = state.projectiles;

    // Draw canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw players
    ctx.fillStyle = "red";
    for (i = 0; i < players.length; i++) {
      players[i].updatePosition(deltaTime);
      ctx.fillRect(
        players[i].x,
        players[i].y,
        g.constants.PLAYER_SIZE,
        g.constants.PLAYER_SIZE
      );
    }

    // Draw projectiles
    ctx.fillStyle = "blue";
    for (i = 0; i < projectiles.length; i++) {
      if (projectiles[i] === null) continue;
      if (projectiles[i].colliding) {
        removeProjectile(projectiles, i);
        continue;
      }
      projectiles[i].updatePosition(deltaTime);
      ctx.fillRect(
        projectiles[i].x,
        projectiles[i].y,
        g.constants.PROJECTILE_SIZE,
        g.constants.PROJECTILE_SIZE
      );
    }

    // Loop
    window.requestAnimationFrame(frame);
  }
}

function isCollidingCircleFast(c1, c2) {
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;
  const distSq = dx * dx + dy * dy;
  const radiusSum = c1.radius + c2.radius;
  return distSq < radiusSum * radiusSum;
}

gameLoop();
