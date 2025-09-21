import { Game } from "./Lib/Game.js";
class SOWGame extends Game {
    constructor(width, height) {
        super(width, height);
    }
    Draw() {
        //this.Ctx.drawImage(this.Warrior.IMG, this.Warrior.X, this.Warrior.Y);
    }
    Process(delta) {
    }
}
;
const game = new SOWGame(800, 600);
game.SetBackground("");
