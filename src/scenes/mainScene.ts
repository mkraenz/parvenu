import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { ILogic } from "./i-logic";
import { LogicBuilder } from "./logicBuilder";
import { WareType } from "./WareType";

export class MainScene extends Scene {
    private logic!: ILogic;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    public preload(): void {
        this.load.image("buy", "./assets/images/buy.png");
        this.load.image("sell", "./assets/images/sell.png");
        this.load.image("background", "./assets/images/background500x300.png");
        this.load.audio("buy", "./assets/sounds/buy.wav");
        this.load.audio("sell", "./assets/sounds/sell.wav");
        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        this.logic = LogicBuilder.get();
        this.addBackground();
        this.addTable();
        this.addBackgroundMusic();
    }

    private addBackgroundMusic() {
        this.sound.add("background").play("", { loop: true });
    }

    private addBackground() {
        this.add
            .image(0, 0, "background")
            .setOrigin(0)
            .setScale(
                (gameConfig.width as number) / 500,
                (gameConfig.height as number) / 300
            );
    }

    private addTable() {
        Object.values(WareType).forEach((ware, i) => {
            this.addRow(ware, 200 + i * 150);
        });
    }

    private addRow(ware: WareType, y: number) {
        this.addBuyButton(ware, y);
        this.addSellButton(ware, y);
        this.addNameSign(ware, y);
    }

    // TODO #10
    private addBuyButton(ware: WareType, y: number) {
        this.addButton("buy", { x: 200, y }, () => this.logic.buy(ware));
    }

    private addSellButton(ware: WareType, y: number) {
        this.addButton("sell", { x: 500, y }, () => this.logic.sell(ware));
    }

    private addNameSign(ware: WareType, y: number) {
        const black = "#000000";
        this.add
            .text(50, y, ware)
            .setFontFamily("Arial")
            .setFontSize(32)
            .setColor(black);
    }

    private addButton(key: string, pos: IPoint, logicCallback: () => void) {
        const button = this.add.sprite(pos.x, pos.y, key);
        button.setInteractive();
        const callBackWithSound = () => {
            logicCallback();
            this.sound.add(key).play();
        };
        button.on("pointerdown", callBackWithSound);
    }
}

interface IPoint {
    x: number;
    y: number;
}
