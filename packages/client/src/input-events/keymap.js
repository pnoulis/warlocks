import { Direction } from "warlocks-common/direction";

export const KeyMap = {
  j: (event) => ({
    type: g.MessageType.PLAYER_MOVING,
    msg: {
      direction: Direction.DOWN,
      start: true,
    },
    kbd: event,
  }),
  k: (event) => ({
    type: g.MessageType.PLAYER_MOVING,
    msg: {
      direction: Direction.UP,
      start: true,
    },
    kbd: event,
  }),
  h: (event) => ({
    type: g.MessageType.PLAYER_MOVING,
    msg: {
      direction: Direction.LEFT,
      start: true,
    },
    kbd: event,
  }),
  l: (event) => ({
    type: g.MessageType.PLAYER_MOVING,
    msg: {
      direction: Direction.RIGHT,
      start: true,
    },
    kbd: event,
  }),
  click: (event) => ({
    type: g.MessageType.PLAYER_MOVING,
    mouse: event,
  }),
};
