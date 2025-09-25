export class Entity {
    X;
    Y;
    Sprite;
    Velocity;
    constructor(X, Y, Sprite, Velocity) {
        this.X = X;
        this.Y = Y;
        this.Sprite = Sprite;
        this.Velocity = Velocity;
    }
    Update(delta) {
        this.Move(delta);
        this.Sprite.Draw();
    }
    Move(delta) {
        this.X += this.Sprite.Direction[0] * this.Velocity[0] * delta;
        this.Y += this.Sprite.Direction[1] * this.Velocity[1] * delta;
    }
    Draw() {
        this.Sprite.Draw();
    }
}
