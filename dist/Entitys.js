export class Entity {
    X;
    Y;
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}
export class EntityRect extends Entity {
    Width;
    Height;
    constructor(x, y, width, height) {
        super(x, y);
        this.Width = width;
        this.Height = height;
    }
}
;
export class EntitySprite extends Entity {
    IMGs;
    constructor(x, y, imgSrc, frameCount = 1, framesPerRow = 1, framesPerCol = 1, alignHorizontal = true) {
        super(x, y);
        this.IMGs = [];
    }
}
;
