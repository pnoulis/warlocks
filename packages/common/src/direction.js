export const Direction = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};

export const DIRECTION_VECTORS = {
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 },
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
};
