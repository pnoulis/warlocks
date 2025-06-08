import { Projectile } from "warlocks-common/Projectile";

export function playerSkillshot(state, msg) {
  const projectile = new Projectile(
    msg.skillshot.type,
    msg.skillshot.uid,
    msg.skillshot.x,
    msg.skillshot.y,
    msg.skillshot.directionX,
    msg.skillshot.directionY
  );
  state.projectiles.push(projectile);
}
