import { Game } from "./Game.js";
export class Sprite {
    pathAtlas;
    pathJson;
    Direction;
    Atlas;
    constructor(pathAtlas, pathJson, Direction = [1, 0]) {
        this.pathAtlas = pathAtlas;
        this.pathJson = pathJson;
        this.Direction = Direction;
        console.log("pathAtlas", pathAtlas);
        console.log("pathJson", pathJson);
        this.Atlas = new Image();
        this.Atlas.src = pathAtlas;
    }
    Draw() {
        Game.Ctx.save();
        Game.Ctx.drawImage(this.Atlas, 0, 0);
        Game.Ctx.restore();
    }
}
