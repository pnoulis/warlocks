import { SkillShotType } from "warlocks-common/skillshot-type";

export const KeyMap = {
  // First skill slot
  a: {
    type: g.MessageType.PLAYER_INTENTS_SKILLSHOT,
    msg: {
      skillshot: SkillShotType.FIREBALL,
    },
  },

  // Second skill slot
  o: {
    type: g.MessageType.PLAYER_INTENTS_SKILLSHOT,
    msg: {
      skillshot: SkillShotType.SHIELD,
    },
  },

  // Third skill slot
  e: {
    type: g.MessageType.PLAYER_INTENTS_SKILLSHOT,
    msg: {
      skillshot: SkillShotType.DASH,
    },
  },

  // Fourth skill slot (ultimate)
  u: {
    type: g.MessageType.PLAYER_INTENTS_SKILLSHOT,
    msg: {
      skillshot: SkillShotType.RAPID_FIREBALLS,
    },
  },
  click: {
    type: g.MessageType.PLAYER_INTENTS_MOVING,
  },
};
