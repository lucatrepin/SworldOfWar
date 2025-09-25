import { Game } from "./Game.js";

type Anim = {
  x: number;
  y: number;
  w: number;
  h: number;
  duration: number;
};

type AnimJson = {
  [key: string]: Anim;
};


export class Sprite {
  private Atlas: HTMLImageElement;
  private Anims: AnimJson;
  private Anim: Anim;
  constructor(
    private pathAtlas: string,
    private pathJson: string,
    public Direction: [number, number] = [1, 0],
  ) {
    console.log("pathAtlas", pathAtlas);
    console.log("pathJson", pathJson);
    this.Atlas = new Image();
    this.Atlas.src = pathAtlas;
  }
  SetAnim(animName: string) : void {

  }
  Draw() : void {
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    // ctx.drawImage(
    //     atlasImage,
    //     frameData.x, // sx (x do recorte)
    //     frameData.y, // sy (y do recorte)
    //     frameData.w, // sw (largura do recorte)
    //     frameData.h, // sh (altura do recorte)
    //     playerPositionX, // dx (x de destino)
    //     playerPositionY, // dy (y de destino)
    //     frameData.w, // dw (largura de destino)
    //     frameData.h  // dh (altura de destino)
    // );
    Game.Ctx.save();
    let x: number = 0;
    let y: number = 0;
    let X: number = 0;
    let Y: number = 0;
    Game.Ctx.drawImage(this.Atlas, x, y, this.Atlas.width, this.Atlas.height, X, Y, this.Atlas.width, this.Atlas.height);
    Game.Ctx.restore();
  }
}
