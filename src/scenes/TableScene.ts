import { Scene } from "phaser";
import { ILogic } from "../logic/ILogic";
import { IPlayer } from "../logic/IPlayer";
import { WareType } from "../logic/WareType";
import { getLogic } from "./data-registry/getLogic";
import { getPlayer } from "./data-registry/getPlayer";
import { KEYS } from "./keys";
import { setDefaultTextStyle } from "./setDefaultTextStyle";
import { TextBuyPrice } from "./TextBuyPrice";
import { TextCityWareQuantity } from "./TextCityWareQuantity";
import { TextPlayerMoney } from "./TextPlayerMoney";
import { TextSellPrice } from "./TextSellPrice";

export class TableScene extends Scene {
    private logic!: ILogic;
    private player!: IPlayer;
    private playerMoneyText!: TextPlayerMoney;
    private textBuyPrices: TextBuyPrice[] = [];
    private textSellPrices: TextSellPrice[] = [];
    private textCityWareQuantities: TextCityWareQuantity[] = [];

    constructor() {
        super({
            key: KEYS.scenes.table,
        });
    }

    public create(): void {
        this.logic = getLogic(this);
        this.player = getPlayer(this);

        this.addPlayerMoneyText(this.player);
        this.addTable();
    }

    public update() {
        const update = (x: { update(): void }) => x.update();
        this.playerMoneyText.update();
        this.textBuyPrices.forEach(update);
        this.textSellPrices.forEach(update);
        this.textCityWareQuantities.forEach(update);
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
        addTextAtY(400, "Buy");
        addTextAtY(500, "Sell");
    }

    private addRow(ware: WareType, y: number) {
        const addTextAtY = this.addTableText(y);
        addTextAtY(50, ware);
        this.addCityQuantityText(y, ware);
        this.addPlayerQuantityText(addTextAtY, ware);
        this.addBuyPrice(y, ware);
        this.addSellPrice(y, ware);
    }

    private addBuyPrice(y: number, ware: WareType) {
        const text = new TextBuyPrice(this, 400, y, "", {});
        this.textBuyPrices.push(text);
        this.children.add(text);
        text.init(this.logic, ware);
    }

    private addSellPrice(y: number, ware: WareType) {
        const text = new TextSellPrice(this, 500, y, "", {});
        this.textSellPrices.push(text);
        this.children.add(text);
        text.init(this.logic, ware);
    }

    private addCityQuantityText(y: number, ware: WareType) {
        const text = new TextCityWareQuantity(this, 200, y, "", {});
        this.textCityWareQuantities.push(text);
        this.children.add(text);
        text.init(this.logic, ware);
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
            setDefaultTextStyle(this.add.text(x, y, text));
    }
}
