import { Character } from "./Lib/Character.js";
import { Sprite } from "./Lib/Sprite.js";

export class Player extends Character {
  static Sprite: Sprite = new Sprite("Assets/Sprites/lobo_lobisomen/Black_Werewolf/atlas_128.png", "Assets/Sprites/lobo_lobisomen/Black_Werewolf/atlas_128.json", [1, 0]);
  constructor(
    public X: number,
    public Y: number,
    public Velocity: [number, number],
  ) {
    super(X, Y, Player.Sprite, Velocity);
  }
}
