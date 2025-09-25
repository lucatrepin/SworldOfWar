import { Sprite } from "./Sprite.js";

export class Entity {
  constructor(
    public X: number,
    public Y: number,
    public Sprite: Sprite,
    public Velocity: [number, number],
  ) {

  }
  Update(delta: number): void {
    this.Move(delta);
    this.Sprite.Draw();
  }
  Move(delta: number): void {
    this.X += this.Sprite.Direction[0] * this.Velocity[0] * delta;
    this.Y += this.Sprite.Direction[1] * this.Velocity[1] * delta;
  }
  Draw(): void {
    this.Sprite.Draw();
  }
}

