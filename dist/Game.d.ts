export declare abstract class Game {
    Canvas: HTMLCanvasElement;
    Ctx: CanvasRenderingContext2D;
    DeltaTime: number;
    GameOver: boolean;
    constructor(canvas: HTMLCanvasElement, width: number, height: number, frames?: number);
    SetCanvasSize(width: number, height: number): void;
    Start(): void;
    private Update;
    abstract Process(): void;
    abstract Draw(): void;
}
//# sourceMappingURL=Game.d.ts.map