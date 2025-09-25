import { Entity } from "./Entitys.js";
export class Character extends Entity {
    Velocity;
    constructor(X, Y, Sprite, Velocity) {
        super(X, Y, Sprite, [1, 1]);
        this.Velocity = Velocity;
    }
    StartingToJump(charge) {
        if (this.Velocity[1] == 0)
            this.Velocity[1] = -charge * this.Velocity[1];
    }
}
