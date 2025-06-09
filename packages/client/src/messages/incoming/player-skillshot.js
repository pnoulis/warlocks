import { Projectile } from "warlocks-common/Projectile";
import { addProjectile } from "warlocks-common/misc";

export function playerSkillshot(state, msg) {
  const projectile = new Projectile(
    msg.skillshot.id,
    msg.skillshot.type,
    msg.skillshot.uid,
    msg.skillshot.x,
    msg.skillshot.y,
    msg.skillshot.directionX,
    msg.skillshot.directionY
  );
  addProjectile(state.projectiles, projectile);
}
