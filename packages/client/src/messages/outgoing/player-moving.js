import { Direction } from "warlocks-common/direction";

export function playerMoving(state, event) {
  const player = event.player;

  switch (event.direction) {
    case Direction.LEFT:
      player.moving.left = true;
      player.moving.right = false;
      break;
    case Direction.RIGHT:
      player.moving.right = true;
      player.moving.left = false;
      break;
    case Direction.UP:
      player.moving.up = true;
      player.moving.down = false;
      break;
    case Direction.DOWN:
      player.moving.down = true;
      player.moving.up = false;
      break;
    default:
      const x = Math.max(event.mouse.clientX - state.canvasRect.x, 0);
      const y = Math.max(event.mouse.clientY - state.canvasRect.y, 0);
      if (x > player.x) {
        player.moving[Direction.RIGHT] = true;
        player.moving[Direction.LEFT] = false;
      } else {
        player.moving[Direction.LEFT] = true;
        player.moving[Direction.RIGHT] = false;
      }

      if (y > player.y) {
        player.moving[Direction.DOWN] = true;
        player.moving[Direction.UP] = false;
      } else {
        player.moving[Direction.UP] = true;
        player.moving[Direction.DOWN] = false;
      }
  }

  const msg = JSON.stringify({
    type: event.type,
    id: player.id,
    moving: player.moving,
  });

  player.ws.send(msg);
}
