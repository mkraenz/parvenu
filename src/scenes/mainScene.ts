import { GameObjects, Scene } from "phaser";
import { MainSceneLogic } from "./mainSceneLogic";

export class MainScene extends Scene {
    private logic: MainSceneLogic;

    constructor() {
        super({
            key: "MainScene"
        });
        this.logic = new MainSceneLogic();
    }

    public preload(): void {
        this.load.image("buy", "./assets/buy.png");
        this.load.image("sell", "./assets/sell.png");
    }

    public create(): void {
        this.addBuyButton();
        this.addSellButton();
    }

    private addBuyButton() {
        this.addButton("buy", { x: 200, y: 300 }, this.logic.buy);
    }

    private addSellButton() {
        this.addButton("sell", { x: 600, y: 300 }, this.logic.sell);
    }

    private addButton(imageKey: string, pos: IPoint, cb: () => void) {
        const button: GameObjects.Sprite = this.add.sprite(
            pos.x,
            pos.y,
            imageKey
        );
        button.setInteractive();
        button.on("pointerdown", cb.bind(this.logic));
    }
}

interface IPoint {
    x: number;
    y: number;
}
