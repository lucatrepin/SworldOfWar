import { Entity } from "./Entitys.js";
import { Sprite } from "./Sprite.js";

export class Character extends Entity {
  constructor(
    X: number,
    Y: number,
    Sprite: Sprite,
    public Velocity: [number, number],
  ) {
    super(X, Y, Sprite, [1, 1]);
  }
  StartingToJump(charge: number): void {
    if (this.Velocity[1] == 0) this.Velocity[1] = -charge * this.Velocity[1];
  }
}
