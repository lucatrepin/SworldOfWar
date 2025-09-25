export const enum ScreenEnum {
  Menu,
  Configs,
  Game,
  Paused,
  GameOver,
  GameWin,
}

export function SetScreen(screen: ScreenEnum): void {
  switch (screen) {
    case ScreenEnum.Menu:
      (document.getElementById("ScreenMenu") as HTMLDivElement).style.display =
        "flex";
      (
        document.getElementById("ScreenConfigs") as HTMLDivElement
      ).style.display = "none";
      (document.getElementById("ScreenGame") as HTMLDivElement).style.display =
        "none";
      (
        document.getElementById("ScreenGameOver") as HTMLDivElement
      ).style.display = "none";
      break;
    case ScreenEnum.Configs:
      (document.getElementById("ScreenMenu") as HTMLDivElement).style.display =
        "none";
      (
        document.getElementById("ScreenConfigs") as HTMLDivElement
      ).style.display = "flex";
      (document.getElementById("ScreenGame") as HTMLDivElement).style.display =
        "none";
      (
        document.getElementById("ScreenGameOver") as HTMLDivElement
      ).style.display = "none";
      break;
    case ScreenEnum.Game:
      (document.getElementById("ScreenMenu") as HTMLDivElement).style.display =
        "none";
      (
        document.getElementById("ScreenConfigs") as HTMLDivElement
      ).style.display = "none";
      (document.getElementById("ScreenGame") as HTMLDivElement).style.display =
        "flex";
      (
        document.getElementById("ScreenGameOver") as HTMLDivElement
      ).style.display = "none";
      break;
    case ScreenEnum.GameOver:
      (document.getElementById("ScreenMenu") as HTMLDivElement).style.display =
        "none";
      (
        document.getElementById("ScreenConfigs") as HTMLDivElement
      ).style.display = "none";
      (document.getElementById("ScreenGame") as HTMLDivElement).style.display =
        "none";
      (
        document.getElementById("ScreenGameOver") as HTMLDivElement
      ).style.display = "flex";
      break;
  }
}

export async function GetText(path: string): Promise<string> {
  const response = await fetch(path);
  const text = await response.text();
  return text;
}


export abstract class Game {
  public static Ctx: CanvasRenderingContext2D;
  private Canvas: HTMLCanvasElement | null = null;
  private InMenu: boolean = true;
  Time: number = 0;
  GamePaused: boolean = false;
  GameOver: boolean = false;
  BackgroundImagePath: string = "";
  constructor(width: number, height: number, canvasColor: string = "gray", canvasBorderRadius: string = "10px") {
    setTimeout(() => {
      this.Canvas = document.getElementById("CanvasGame") as HTMLCanvasElement;
      if (this.Canvas != null) {
        this.Canvas.style.width = `${width}px`;
        this.Canvas.style.height = `${height}px`;
        this.Canvas.style.backgroundColor = canvasColor;
        this.Canvas.style.borderRadius = canvasBorderRadius;
        Game.Ctx = this.Canvas.getContext("2d")!;
      } else {
        console.error("Canvas is null");
      }
      document.getElementById("BtnStart")!.addEventListener("click", () => {
        this.InMenu = false;
        SetScreen(ScreenEnum.Game);
        this.Time = Date.now();
        this.Update();
      });
      document
        .getElementById("BtnExitConfigs")!
        .addEventListener("click", () => {
          if (this.InMenu) SetScreen(ScreenEnum.Menu);
          else SetScreen(ScreenEnum.Game);
        });
      for (const element of document.getElementsByClassName("BtnOpenConfigs")) {
        (element as HTMLButtonElement).addEventListener("click", () => {
          SetScreen(ScreenEnum.Configs);
        });
      }
      document
        .getElementById("BtnReturnToMenu")!
        .addEventListener("click", () => {
          this.InMenu = true;
          SetScreen(ScreenEnum.Menu);
        });
      SetScreen(ScreenEnum.Menu);
    }, 0); // To allow the DOM to load
    this.Ready();
  }
  SetBackground(pathImg: string): void {
    this.BackgroundImagePath = pathImg;
  }
  private Update(): void {
    const delta: number = 1 / ((Date.now() - this.Time) / 1000);
    this.Time = Date.now();
    this.Process(delta);
    Game.Ctx!.clearRect(0, 0, this.Canvas!.width, this.Canvas!.height);
    const backgroundImage: CanvasImageSource = new Image();
    backgroundImage.src = this.BackgroundImagePath;
    Game.Ctx!.drawImage(
      backgroundImage,
      0,
      0,
      this.Canvas!.width,
      this.Canvas!.height,
    );
    this.Draw();
    if (!this.GameOver || !this.GamePaused) {
      requestAnimationFrame(this.Update.bind(this));
    }
  }
  async Ready(): Promise<void> {}
  abstract Process(delta: number): void;
  abstract Draw(): void;
}
