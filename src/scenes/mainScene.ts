import { GameObjects, Scene } from "phaser";

export class MainScene extends Scene {
    private logo!: GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    public preload(): void {
        this.load.image("logo", "./assets/boilerplate/phaser.png");
    }

    public create(): void {
        this.logo = this.add.sprite(400, 300, "logo");
    }

    public update(): void {
        this.moveLogoAndDestroy();
    }

    private moveLogoAndDestroy() {
        this.logo.setX(this.logo.x - 1);
        if (this.logo.x < 200) {
            this.logo.destroy();
        }
    }
}
