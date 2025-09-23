import { Entity } from "./Entitys.js";

export class Character extends Entity {
	constructor(
		X: number,
		Y: number,
		pathAtlas: string,
		public Velocity: [number, number]
	) {
		super(X, Y, pathAtlas);
	}
	Move(delta: number, dirX: number, dirY: number): void {
		this.X += dirX * this.Velocity[0] * delta;
		this.Y += dirY * this.Velocity[1] * delta;
	}
	StartingToJump(charge: number): void {
		if (this.Velocity[1] == 0) this.Velocity[1] = -charge * this.Velocity[1];
	}
};