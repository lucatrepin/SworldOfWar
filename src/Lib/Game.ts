export const enum ScreenEnum {
    Menu,
    Config,
    Game,
    GameOver
};

export function SetScreen(screen: ScreenEnum): void {
    switch(screen) {
        case ScreenEnum.Menu:
            (document.getElementById("ScreenMenu") as HTMLDivElement).style.display = "flex";
            (document.getElementById("ScreenConfig") as HTMLDivElement).style.display = "none";
            (document.getElementById("ContainerGame") as HTMLDivElement).style.display = "none";
            (document.getElementById("ScreenGameOver") as HTMLDivElement).style.display = "none";
            break;
        case ScreenEnum.Config:
            (document.getElementById("ScreenMenu") as HTMLDivElement).style.display = "none";
            (document.getElementById("ScreenConfig") as HTMLDivElement).style.display = "flex";
            (document.getElementById("ContainerGame") as HTMLDivElement).style.display = "none";
            (document.getElementById("ScreenGameOver") as HTMLDivElement).style.display = "none";
            break;
        case ScreenEnum.Game:
            (document.getElementById("ScreenMenu") as HTMLDivElement).style.display = "none";
            (document.getElementById("ScreenConfig") as HTMLDivElement).style.display = "none";
            (document.getElementById("ContainerGame") as HTMLDivElement).style.display = "flex";
            (document.getElementById("ScreenGameOver") as HTMLDivElement).style.display = "none";
            break;
        case ScreenEnum.GameOver:
            (document.getElementById("ScreenMenu") as HTMLDivElement).style.display = "none";
            (document.getElementById("ScreenConfig") as HTMLDivElement).style.display = "none";
            (document.getElementById("ContainerGame") as HTMLDivElement).style.display = "none";
            (document.getElementById("ScreenGameOver") as HTMLDivElement).style.display = "flex";
            break;
    }
};

export async function GetText(path: string): Promise<string> {
    const response = await fetch(path);
    const text = await response.text();
    return text;
};

export abstract class Game {
    Container: HTMLDivElement = null as any;
    Canvas: HTMLCanvasElement = null as any;
    Ctx: CanvasRenderingContext2D = null as any;
    Time: number = 0;
    GamePaused: boolean = false;
    GameOver: boolean = false;
    BackgroundImagePath: string = "";
    constructor(width: number, height: number) {
        this.Initialize(width, height);
    }
    async Initialize(width: number, height: number): Promise<void> {

    }
    SetContainerSize(width: number, height: number): void {
        this.Container.style.width = `${width}px`;
        this.Container.style.height = `${height}px`;
    }
    SetBackground(pathImg: string): void {
        this.BackgroundImagePath = pathImg;
    }
    Start(): void {
        requestAnimationFrame(this.Update.bind(this));
    }
    ExitConfigs(): void {
        SetScreen(ScreenEnum.Menu);
    }
    Pause(): void {
        this.GamePaused = true;
    }
    Restart(): void {
        this.GameOver = false;
        this.GamePaused = false;
        this.Start();
    }
    private Update() : void {
        const delta: number = 1 / ((Date.now() - this.Time) / 1000);
        this.Time = Date.now();
        this.Process(delta);
        this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        const backgroundImage: CanvasImageSource = new Image();
        backgroundImage.src = this.BackgroundImagePath;
        this.Ctx.drawImage(backgroundImage, 0, 0, this.Canvas.width, this.Canvas.height);
        this.Draw();
        if (!this.GameOver || this.GamePaused) requestAnimationFrame(this.Update.bind(this));
    }
    abstract Process(delta: number): void;
    abstract Draw(): void;
};