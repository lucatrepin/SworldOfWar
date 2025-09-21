;
export function SetScreen(screen) {
    switch (screen) {
        case 0 /* ScreenEnum.Menu */:
            document.getElementById("ScreenMenu").style.display = "flex";
            document.getElementById("ScreenConfig").style.display = "none";
            document.getElementById("ContainerGame").style.display = "none";
            document.getElementById("ScreenGameOver").style.display = "none";
            break;
        case 1 /* ScreenEnum.Config */:
            document.getElementById("ScreenMenu").style.display = "none";
            document.getElementById("ScreenConfig").style.display = "flex";
            document.getElementById("ContainerGame").style.display = "none";
            document.getElementById("ScreenGameOver").style.display = "none";
            break;
        case 2 /* ScreenEnum.Game */:
            document.getElementById("ScreenMenu").style.display = "none";
            document.getElementById("ScreenConfig").style.display = "none";
            document.getElementById("ContainerGame").style.display = "flex";
            document.getElementById("ScreenGameOver").style.display = "none";
            break;
        case 3 /* ScreenEnum.GameOver */:
            document.getElementById("ScreenMenu").style.display = "none";
            document.getElementById("ScreenConfig").style.display = "none";
            document.getElementById("ContainerGame").style.display = "none";
            document.getElementById("ScreenGameOver").style.display = "flex";
            break;
    }
}
;
export async function GetText(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text;
}
;
export class Game {
    Container = null;
    Canvas = null;
    Ctx = null;
    Time = 0;
    GamePaused = false;
    GameOver = false;
    BackgroundImagePath = "";
    constructor(width, height) {
        this.Initialize(width, height);
    }
    async Initialize(width, height) {
    }
    SetContainerSize(width, height) {
        this.Container.style.width = `${width}px`;
        this.Container.style.height = `${height}px`;
    }
    SetBackground(pathImg) {
        this.BackgroundImagePath = pathImg;
    }
    Start() {
        requestAnimationFrame(this.Update.bind(this));
    }
    ExitConfigs() {
        SetScreen(0 /* ScreenEnum.Menu */);
    }
    Pause() {
        this.GamePaused = true;
    }
    Restart() {
        this.GameOver = false;
        this.GamePaused = false;
        this.Start();
    }
    Update() {
        const delta = 1 / ((Date.now() - this.Time) / 1000);
        this.Time = Date.now();
        this.Process(delta);
        this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        const backgroundImage = new Image();
        backgroundImage.src = this.BackgroundImagePath;
        this.Ctx.drawImage(backgroundImage, 0, 0, this.Canvas.width, this.Canvas.height);
        this.Draw();
        if (!this.GameOver || this.GamePaused)
            requestAnimationFrame(this.Update.bind(this));
    }
}
;
