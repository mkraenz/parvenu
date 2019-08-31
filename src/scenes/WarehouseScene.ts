import { Scene } from "phaser";
import { ILogic } from "../logic/ILogic";
import { IPlayer } from "../logic/IPlayer";
import { WareType } from "../logic/WareType";
import { getLogic } from "./data-registry/getLogic";
import { getPlayer } from "./data-registry/getPlayer";
import { KEYS, wareViewConfig } from "./keys";
import { setDefaultTextStyle } from "./setDefaultTextStyle";
import { StoreWareButton } from "./StoreWareButton";
import { TakeWareButton } from "./TakeWareButton";
import { TextWarehouseWareQuantity } from "./TextWarehouseWareQuantity";
import { WareButton } from "./WareButton";

const TOP = 500;
const LEFT = 0;
const RIGHT = 640 - 40;
const CENTER = RIGHT / 2;
const HEADER = TOP + 40;
const FIRST_ROW = HEADER + 50;
const SPACE_BETWEEN_ROWS = 60;
const COLUMN = {
    warehouse: LEFT + 50,
    store: LEFT + 150,
    storehouse: LEFT + 220,
    ware: CENTER,
    take: LEFT + 400,
    player: LEFT + 500,
};
const WARE_ICON_SIZE = 50;

export class WarehouseScene extends Scene {
    private logic!: ILogic;
    private player!: IPlayer;
    private takeButtons: WareButton[] = [];
    private storeButtons: WareButton[] = [];
    private textWarehouseWareQuantities: TextWarehouseWareQuantity[] = [];

    constructor() {
        super({
            key: KEYS.scenes.warehouse,
        });
    }

    public create(): void {
        this.logic = getLogic(this);
        this.player = getPlayer(this);

        this.addBackground();
        this.addTable();
    }

    public update() {
        const update = (x: { update(): void }) => x.update();
        this.takeButtons.forEach(update);
        this.storeButtons.forEach(update);
        this.textWarehouseWareQuantities.forEach(update);
    }

    private addTable() {
        this.addHeader();
        Object.values(WareType).forEach((ware, i) => {
            this.addRow(ware, FIRST_ROW + i * SPACE_BETWEEN_ROWS);
        });
    }

    private addHeader() {
        const addTextAtY = this.addTableText(HEADER);
        this.add
            .image(COLUMN.warehouse, HEADER, KEYS.images.warehouse.key)
            .setOrigin(0, 0.15)
            .setScale(0.15);
        this.add
            .image(COLUMN.player, HEADER, KEYS.images.ship.key)
            .setOrigin(0, 0.5)
            .setScale(0.25);
        addTextAtY(COLUMN.storehouse, "Storehouse");
    }

    private addRow(ware: WareType, y: number) {
        const addTextAtY = this.addTableText(y);
        const icon = wareViewConfig[ware].image;
        this.add
            .image(COLUMN.ware, y, icon.key)
            .setOrigin(0.5, 0.2)
            .setScale(
                WARE_ICON_SIZE / icon.width,
                WARE_ICON_SIZE / icon.height
            );
        this.addWarehouseQuantityText(y, ware);
        this.addPlayerQuantityText(addTextAtY, ware);
        this.addTakePrice(y, ware);
        this.addStorePrice(y, ware);
    }

    private addTakePrice(y: number, ware: WareType) {
        const text = new TakeWareButton(this, COLUMN.take, y, "", {});
        this.takeButtons.push(text);
        this.children.add(text);
        text.init(this.logic, ware);
    }

    private addStorePrice(y: number, ware: WareType) {
        const text = new StoreWareButton(this, COLUMN.store, y, "", {});
        this.storeButtons.push(text);
        this.children.add(text);
        text.init(this.logic, ware);
    }

    private addWarehouseQuantityText(y: number, ware: WareType) {
        const text = new TextWarehouseWareQuantity(
            this,
            COLUMN.warehouse,
            y,
            "",
            {}
        );
        this.textWarehouseWareQuantities.push(text);
        this.children.add(text);
        text.init(this.logic.city.warehouse.get(ware));
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
