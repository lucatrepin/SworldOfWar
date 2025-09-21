export class Entity {
    X: number;
    Y: number;
    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
}

export class EntityRect extends Entity {
    Width: number;
    Height: number;
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);
        this.Width = width;
        this.Height = height;
    }
};

export class EntitySprite extends Entity {
    IMGs: HTMLImageElement[];
    constructor(x: number, y: number, imgSrc: string, frameCount: number = 1, framesPerRow: number = 1, framesPerCol: number = 1, alignHorizontal: boolean = true) {
        super(x, y);
        this.IMGs = [];
    }
};