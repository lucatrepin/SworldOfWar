import { Character } from "./Lib/Character.js";
import { Sprite } from "./Lib/Sprite.js";
export class Player extends Character {
    X;
    Y;
    Velocity;
    static Sprite = new Sprite("Assets/Sprites/lobo_lobisomen/Black_Werewolf/atlas_128.png", "Assets/Sprites/lobo_lobisomen/Black_Werewolf/atlas_128.json", [1, 0]);
    constructor(X, Y, Velocity) {
        super(X, Y, Player.Sprite, Velocity);
        this.X = X;
        this.Y = Y;
        this.Velocity = Velocity;
    }
}
