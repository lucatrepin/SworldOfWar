export declare class Entity {
    X: number;
    Y: number;
    constructor(x: number, y: number);
}
export declare class EntityRect extends Entity {
    Width: number;
    Height: number;
    constructor(x: number, y: number, width: number, height: number);
}
export declare class EntitySprite extends Entity {
    IMGs: HTMLImageElement[];
    constructor(x: number, y: number, imgSrc: string, frameCount?: number, framesPerRow?: number, framesPerCol?: number, alignHorizontal?: boolean);
}
//# sourceMappingURL=Entitys.d.ts.map