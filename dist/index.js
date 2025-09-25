import { Game } from "./Lib/Game.js";
import { Player } from "./Player.js";
class SOWGame extends Game {
    Player = new Player(100, 100, [200, 200]);
    constructor(width, height) {
        super(width, height);
    }
    async Ready() {
        console.log("Game is ready!");
    }
    Draw() {
        this.Player.Draw();
    }
    Process(delta) { }
}
const game = new SOWGame(800, 600);
game.SetBackground("");
