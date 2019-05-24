import { Scene } from "phaser";
import { Color } from "../Color";
import { gameConfig } from "../game-config";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { IPlayer } from "./IPlayer";
import { LogicBuilder } from "./logicBuilder";
import { TextBuyPrice } from "./TextBuyPrice";
import { TextPlayerMoney } from "./TextPlayerMoney";
import { TextSellPrice } from "./TextSellPrice";
import { WareType } from "./wareType";

export class MainScene extends Scene {
    private logic!: ILogic;
    private playerMoneyText!: TextPlayerMoney;
    private textBuyPrices: TextBuyPrice[] = [];
    private textSellPrices: TextSellPrice[] = [];

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
        const logicObjects = LogicBuilder.create();
        this.logic = logicObjects.logic;
        this.addBackgroundMusic();
        this.addBackground();
        this.addPlayerMoneyText(logicObjects.player);
        this.addTable(logicObjects.city);
    }

    public update() {
        const update = (x: { update(): void }) => x.update();
        this.playerMoneyText.update();
        this.textBuyPrices.forEach(update);
        this.textSellPrices.forEach(update);
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

    private addPlayerMoneyText(player: IPlayer) {
        this.playerMoneyText = new TextPlayerMoney(this, 50, 75, "", {});
        this.children.add(this.playerMoneyText);
        this.playerMoneyText.init(player);
    }

    private addTable(city: ICity) {
        this.addHeader();
        Object.values(WareType).forEach((ware, i) => {
            this.addRow(ware, 200 + i * 150, city);
        });
    }
    private addHeader() {
        const addTextAtY = this.addTableText(150);
        addTextAtY(200, "City");
        addTextAtY(300, "You");
        addTextAtY(600, "Buy");
        addTextAtY(700, "Sell");
    }

    private addRow(ware: WareType, y: number, city: ICity) {
        this.addBuyButton(ware, y);
        this.addSellButton(ware, y);
        const addTextAtY = this.addTableText(y);
        addTextAtY(50, ware);
        this.addCityQuantityText(addTextAtY, ware);
        this.addPlayerQuantityText(addTextAtY, ware);
        this.addBuyPrice(y, city, ware);
        this.addSellPrice(y, city, ware);
    }

    private addBuyPrice(y: number, city: ICity, ware: WareType) {
        const text = new TextBuyPrice(this, 600, y, "", {});
        this.textBuyPrices.push(text);
        this.children.add(text);
        text.init(city, ware);
    }
    private addSellPrice(y: number, city: ICity, ware: WareType) {
        const text = new TextSellPrice(this, 700, y, "", {});
        this.textSellPrices.push(text);
        this.children.add(text);
        text.init(city, ware);
    }

    private addBuyButton(ware: WareType, y: number) {
        this.addButton("buy", { x: 400, y }, () => this.logic.buy(ware));
    }

    private addSellButton(ware: WareType, y: number) {
        this.addButton("sell", { x: 500, y }, () => this.logic.sell(ware));
    }

    private addCityQuantityText(
        addTextAtY: (x: number, text: string) => Phaser.GameObjects.Text,
        ware: WareType
    ) {
        const cityQuantityText = addTextAtY(
            200,
            this.logic.getCityQuantity(ware).toString()
        );
        this.logic
            .getCityQuantityStream(ware)
            .subscribe(quantity =>
                cityQuantityText.setText(quantity.toString())
            );
    }

    private addPlayerQuantityText(
        addTextAtY: (x: number, text: string) => Phaser.GameObjects.Text,
        ware: WareType
    ) {
        const playerQuantityText = addTextAtY(
            300,
            this.logic.getPlayerQuantity(ware).toString()
        );
        this.logic
            .getPlayerQuantityStream(ware)
            .subscribe(quantity =>
                playerQuantityText.setText(quantity.toString())
            );
    }

    private addTableText(y: number) {
        return (x: number, text: string) =>
            this.add
                .text(x, y, text)
                .setFontFamily("Arial")
                .setFontSize(32)
                .setColor(Color.black);
    }

    private addButton(key: string, pos: IPoint, logicCallback: () => void) {
        const button = this.add.sprite(pos.x, pos.y, key);
        button.setInteractive();
        const callBackWithSound = () => {
            logicCallback();
            // TODO dont `add` in each call, add once and play often
            this.sound.add(key).play();
        };
        button.on("pointerdown", callBackWithSound);
    }
}

interface IPoint {
    x: number;
    y: number;
}
