import { Entity } from "./Lib/Entitys.js";
import { Game } from "./Lib/Game.js";

class SOWGame extends Game {
    constructor(width: number, height: number) {
        super(width, height);
    }
    override Draw(): void {
        //this.Ctx.drawImage(this.Warrior.IMG, this.Warrior.X, this.Warrior.Y);
    }
    override Process(delta: number): void {
        
    }
};

const game = new SOWGame(800, 600);
game.SetBackground("");