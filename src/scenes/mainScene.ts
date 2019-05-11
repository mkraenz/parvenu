import { Scene } from "phaser";
import { Color } from "../Color";
import { gameConfig } from "../game-config";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { IPlayer } from "./IPlayer";
import { LogicBuilder } from "./logicBuilder";
import { TextBuyPrice } from "./TextBuyPrice";
import { TextPlayerMoney } from "./TextPlayerMoney";
import { WareType } from "./wareType";

export class MainScene extends Scene {
    private logic!: ILogic;
    private playerMoneyText!: TextPlayerMoney;
    /* textBuyPrice soll array werden, da sonst textBruyPrice dreimal für alle Warentypen gemacht werden muss.... viel text xS */
    private textBuyPrices!: TextBuyPrice[];

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
        this.addBuyPriceColumn(logicObjects.city);
        this.addTable();
    }

    public update() {
        this.playerMoneyText.update();
        for (const entry of this.textBuyPrices) {
            entry.update();
        }
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
    private addBuyPriceColumn(city: ICity) {
        this.textBuyPrices = [];
        Object.values(WareType).forEach((ware, i) => {
            this.textBuyPrices.push(
                new TextBuyPrice(this, 600, i * 150 + 200, "", {})
            );
            /* assuming that textBuyPrices has length 0*/
            this.children.add(this.textBuyPrices[i]);
            this.textBuyPrices[i].init(city, ware);
        });
    }

    private addTable() {
        this.addHeader();
        Object.values(WareType).forEach((ware, i) => {
            this.addRow(ware, 200 + i * 150);
        });
    }
    private addHeader() {
        const addTextAtY = this.addTableText(150);
        addTextAtY(200, "City");
        addTextAtY(300, "You");
        addTextAtY(600, "Price");
    }

    private addRow(ware: WareType, y: number) {
        this.addBuyButton(ware, y);
        this.addSellButton(ware, y);
        const addTextAtY = this.addTableText(y);
        addTextAtY(50, ware);
        this.addCityQuantityText(addTextAtY, ware);
        this.addPlayerQuantityText(addTextAtY, ware);
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
