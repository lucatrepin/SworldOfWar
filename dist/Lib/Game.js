;
export function SetScreen(screen) {
    switch (screen) {
        case 0 /* ScreenEnum.Menu */:
            document.getElementById("ScreenMenu").style.display = "flex";
            document.getElementById("ScreenConfigs").style.display = "none";
            document.getElementById("ScreenGame").style.display = "none";
            document.getElementById("ScreenGameOver").style.display = "none";
            break;
        case 1 /* ScreenEnum.Configs */:
            document.getElementById("ScreenMenu").style.display = "none";
            document.getElementById("ScreenConfigs").style.display = "flex";
            document.getElementById("ScreenGame").style.display = "none";
            document.getElementById("ScreenGameOver").style.display = "none";
            break;
        case 2 /* ScreenEnum.Game */:
            document.getElementById("ScreenMenu").style.display = "none";
            document.getElementById("ScreenConfigs").style.display = "none";
            document.getElementById("ScreenGame").style.display = "flex";
            document.getElementById("ScreenGameOver").style.display = "none";
            break;
        case 4 /* ScreenEnum.GameOver */:
            document.getElementById("ScreenMenu").style.display = "none";
            document.getElementById("ScreenConfigs").style.display = "none";
            document.getElementById("ScreenGame").style.display = "none";
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
    InMenu = true;
    Time = 0;
    GamePaused = false;
    GameOver = false;
    BackgroundImagePath = "";
    constructor(width, height) {
        setTimeout(() => {
            this.Canvas = document.createElement("canvas");
            this.Canvas.style.width = `${width}px`;
            this.Canvas.style.height = `${height}px`;
            if (this.Canvas != null)
                this.Ctx = this.Canvas.getContext("2d");
            (document.getElementById("BtnStart")).addEventListener("click", () => {
                this.InMenu = false;
                SetScreen(2 /* ScreenEnum.Game */);
                this.Time = Date.now();
                this.Update();
            });
            (document.getElementById("BtnExitConfigs")).addEventListener("click", () => {
                if (this.InMenu)
                    SetScreen(0 /* ScreenEnum.Menu */);
                else
                    SetScreen(2 /* ScreenEnum.Game */);
            });
            for (const element of document.getElementsByClassName("BtnOpenConfigs")) {
                element.addEventListener("click", () => {
                    SetScreen(1 /* ScreenEnum.Configs */);
                });
            }
            (document.getElementById("BtnReturnToMenu")).addEventListener("click", () => {
                this.InMenu = true;
                SetScreen(0 /* ScreenEnum.Menu */);
            });
            SetScreen(0 /* ScreenEnum.Menu */);
        }, 0); // To allow the DOM to load
    }
    SetBackground(pathImg) {
        this.BackgroundImagePath = pathImg;
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
