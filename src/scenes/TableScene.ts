import { Scene } from "phaser";
import { ILogic } from "../logic/ILogic";
import { IPlayer } from "../logic/IPlayer";
import { WareType } from "../logic/WareType";
import { getLogic } from "./data-registry/getLogic";
import { getPlayer } from "./data-registry/getPlayer";
import { KEYS } from "./keys";
import { QuantityButton } from "./QuantityButton";
import { setDefaultTextStyle } from "./setDefaultTextStyle";
import { TextBuyPrice } from "./TextBuyPrice";
import { TextCityWareQuantity } from "./TextCityWareQuantity";
import { TextPlayerMoney } from "./TextPlayerMoney";
import { TextSellPrice } from "./TextSellPrice";

const TOP = 50;
const LEFT = 0;
const PLAYER_MONEY = TOP + 25;
const HEADER = TOP + 100;
const FIRST_ROW = HEADER + 50;
const SPACE_BETWEEN_ROWS = 60;
const COLUMN = {
    ware: LEFT + 50,
    city: LEFT + 200,
    buy: LEFT + 300,
    sell: LEFT + 400,
    player: LEFT + 500,
};

export class TableScene extends Scene {
    private logic!: ILogic;
    private player!: IPlayer;
    private playerMoneyText!: TextPlayerMoney;
    private textBuyPrices: TextBuyPrice[] = [];
    private textSellPrices: TextSellPrice[] = [];
    private textCityWareQuantities: TextCityWareQuantity[] = [];
    private quantityButton!: QuantityButton;

    constructor() {
        super({
            key: KEYS.scenes.table,
        });
    }

    public create(): void {
        this.logic = getLogic(this);
        this.player = getPlayer(this);

        this.addBackground();
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
        this.playerMoneyText = new TextPlayerMoney(
            this,
            COLUMN.ware,
            PLAYER_MONEY,
            "",
            {}
        );
        this.children.add(this.playerMoneyText);
        this.playerMoneyText.init(player);
    }

    private addTable() {
        this.addHeader();
        Object.values(WareType).forEach((ware, i) => {
            this.addRow(ware, FIRST_ROW + i * SPACE_BETWEEN_ROWS);
        });
        this.addQuantityButton(50, 500, 1);
        this.addQuantityButton(150, 500, 5);
        this.addQuantityButton(250, 500, 10);
    }

    private addHeader() {
        const addTextAtY = this.addTableText(HEADER);
        addTextAtY(COLUMN.city, "City");
        addTextAtY(COLUMN.player, "You");
        addTextAtY(COLUMN.buy, "Buy");
        addTextAtY(COLUMN.sell, "Sell");
    }

    private addRow(ware: WareType, y: number) {
        const addTextAtY = this.addTableText(y);
        addTextAtY(COLUMN.ware, ware);
        this.addCityQuantityText(y, ware);
        this.addPlayerQuantityText(addTextAtY, ware);
        this.addBuyPrice(y, ware);
        this.addSellPrice(y, ware);
    }

    private addBuyPrice(y: number, ware: WareType) {
        const text = new TextBuyPrice(this, COLUMN.buy, y, "", {});
        this.textBuyPrices.push(text);
        this.children.add(text);
        text.init(this.logic, ware);
    }

    private addQuantityButton(x: number, y: number, quantity: number) {
        this.quantityButton = new QuantityButton(
            this,
            x,
            y,
            quantity.toString(),
            {}
        );
        this.children.add(this.quantityButton);
        this.quantityButton.init(this.logic, quantity);
    }

    private addSellPrice(y: number, ware: WareType) {
        const text = new TextSellPrice(this, COLUMN.sell, y, "", {});
        this.textSellPrices.push(text);
        this.children.add(text);
        text.init(this.logic, ware);
    }

    private addCityQuantityText(y: number, ware: WareType) {
        const text = new TextCityWareQuantity(this, COLUMN.city, y, "", {});
        this.textCityWareQuantities.push(text);
        this.children.add(text);
        text.init(this.logic.city.get(ware));
    }

    private addPlayerQuantityText(
        addTextAtY: (x: number, text: string) => Phaser.GameObjects.Text,
        ware: WareType
    ) {
        const playerQuantityText = addTextAtY(
            COLUMN.player,
            this.player
                .get(ware)
                .getQuantity()
                .toString()
        );
        this.player
            .get(ware)
            .getQuantity$()
            .subscribe(quantity =>
                playerQuantityText.setText(quantity.toString())
            );
    }

    private addTableText(y: number) {
        return (x: number, text: string) =>
            setDefaultTextStyle(this.add.text(x, y, text));
    }

    private addBackground() {
        this.add
            .image(LEFT, TOP, KEYS.images.parchment.key)
            .setOrigin(0)
            .setScale(1, 0.25 * Object.keys(WareType).length)
            .setAlpha(0.7);
    }
}
