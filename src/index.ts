import { Entity } from "./Lib/Entitys.js";
import { Game } from "./Lib/Game.js";
import { Sprite } from "./Lib/Sprite.js";
import { Player } from "./Player.js";

class SOWGame extends Game {
  Player: Player = new Player(100, 100, [200, 200]);
  constructor(width: number, height: number) {
    super(width, height);
  }
  override async Ready(): Promise<void> {
    console.log("Game is ready!");
  }
  override Draw(): void {
    this.Player.Draw();
  }
  override Process(delta: number): void {}
}

const game = new SOWGame(800, 600);
game.SetBackground("");
