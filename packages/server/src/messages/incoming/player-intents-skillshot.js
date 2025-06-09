import { Projectile } from "warlocks-common/Projectile";
import { SkillShotType } from "warlocks-common/skillshot-type";
import { addProjectile } from "warlocks-common/misc";

export function playerIntentsSkillshot(state, event) {
  switch (event.msg.skillshot) {
    case SkillShotType.FIREBALL:
      const projectile = new Projectile(
        crypto.randomUUID(),
        event.msg.skillshot,
        event.player.id,
        event.player.x,
        event.player.y,
        event.msg.directionX,
        event.msg.directionY
      );
      addProjectile(state.projectiles, projectile);
      state.eventQueue.push({
        type: g.MessageType.PLAYER_SKILLSHOT,
        skillshot: projectile,
        player: event.player,
      });
      break;
    case SkillShotType.SHIELD:
      break;
    case SkillShotType.DASH:
      break;
    case SkillShotType.RAPID_FIREBALLS:
      break;
    default:
      throw new Error(`Unrecognized skillshot: ${event.msg.skillshot}`, {
        cause: event,
      });
  }
}
