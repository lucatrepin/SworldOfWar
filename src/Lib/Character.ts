import { Entity } from "./Entitys.js";

export class Character<Atlas> extends Entity<Atlas> {
	constructor(
		X: number,
		Y: number,
		public Velocity: [number, number]
	) {
		super(X, Y);
	}
	Move(delta: number, dirX: number, dirY: number): void {
		this.X += dirX * this.Velocity[0] * delta;
		this.Y += dirY * this.Velocity[1] * delta;
	}
	StartingToJump(charge: number): void {
		if (this.Velocity[1] == 0) this.Velocity[1] = -charge * this.Velocity[1];
	}
};