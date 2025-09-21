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
    Canvas = null;
    Ctx = null;
    Time = 0;
    GameOver = false;
    BackgroundImagePath = "";
    constructor(width, height) {
        this.Initialize(width, height);
    }
    async Initialize(width, height) {
        let container = document.getElementById("Container");
        container.innerHTML = await GetText("Lib/Screens.html");
        this.Canvas = document.getElementById("CanvasGame");
        this.Ctx = this.Canvas.getContext("2d");
    }
    SetCanvasSize(width, height) {
        this.Canvas.width = width;
        this.Canvas.height = height;
    }
    SetBackground(pathImg) {
        this.BackgroundImagePath = pathImg;
    }
    Start() {
        requestAnimationFrame(this.Update.bind(this));
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
        if (!this.GameOver)
            requestAnimationFrame(this.Update.bind(this));
    }
}
;
