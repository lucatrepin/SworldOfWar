export class Sprite {
  Atlas;
  constructor(pathAtlas, pathJson) {
    console.log("pathAtlas", pathAtlas);
    console.log("pathJson", pathJson);
    this.Atlas = new Image();
    this.Atlas.src = pathAtlas;
  }
}
