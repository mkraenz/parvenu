import { Scene } from "phaser";
import { Color } from "../Color";
import { getLogic } from "./data-registry/getLogic";
import { getPlayer } from "./data-registry/getPlayer";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { IPlayer } from "./IPlayer";
import { KEYS } from "./keys";
import { TextBuyPrice } from "./TextBuyPrice";
import { TextPlayerMoney } from "./TextPlayerMoney";
import { TextSellPrice } from "./TextSellPrice";
import { WareType } from "./wareType";

export class TableScene extends Scene {
    private logic!: ILogic;
    private city!: ICity;
    private player!: IPlayer;
    private playerMoneyText!: TextPlayerMoney;
    private textBuyPrices: TextBuyPrice[] = [];
    private textSellPrices: TextSellPrice[] = [];

    constructor() {
        super({
            key: KEYS.scenes.table,
        });
    }

    public create(): void {
        this.logic = getLogic(this);
        this.city = this.logic.city;
        this.player = getPlayer(this);

        this.addPlayerMoneyText(this.player);
        this.addTable();
    }

    public update() {
        const update = (x: { update(): void }) => x.update();
        this.playerMoneyText.update();
        this.textBuyPrices.forEach(update);
        this.textSellPrices.forEach(update);
    }

    private addPlayerMoneyText(player: IPlayer) {
        this.playerMoneyText = new TextPlayerMoney(this, 50, 75, "", {});
        this.children.add(this.playerMoneyText);
        this.playerMoneyText.init(player);
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
        addTextAtY(600, "Buy");
        addTextAtY(700, "Sell");
    }

    private addRow(ware: WareType, y: number) {
        this.addBuyButton(ware, y);
        this.addSellButton(ware, y);
        const addTextAtY = this.addTableText(y);
        addTextAtY(50, ware);
        this.addCityQuantityText(addTextAtY, ware);
        this.addPlayerQuantityText(addTextAtY, ware);
        this.addBuyPrice(y, ware);
        this.addSellPrice(y, ware);
    }

    private addBuyPrice(y: number, ware: WareType) {
        const text = new TextBuyPrice(this, 600, y, "", {});
        this.textBuyPrices.push(text);
        this.children.add(text);
        text.init(this.city, ware);
    }
    private addSellPrice(y: number, ware: WareType) {
        const text = new TextSellPrice(this, 700, y, "", {});
        this.textSellPrices.push(text);
        this.children.add(text);
        text.init(this.city, ware);
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
            this.city
                .get(ware)
                .getQuantity()
                .toString()
        );
        this.city
            .get(ware)
            .getStream()
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
            this.player
                .get(ware)
                .getQuantity()
                .toString()
        );
        this.player
            .get(ware)
            .getStream()
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
                .setColor(Color.Black);
    }

    private addButton(key: string, pos: IPoint, logicCallback: () => void) {
        const button = this.add.sprite(pos.x, pos.y, key);
        button.setInteractive();
        const callBackWithSound = () => {
            logicCallback();
            this.sound.play(key);
        };
        button.on("pointerdown", callBackWithSound);
    }
}

interface IPoint {
    x: number;
    y: number;
}
