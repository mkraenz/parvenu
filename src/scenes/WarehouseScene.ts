import { GameObjects, Scene } from "phaser";
import { ILogic } from "../logic/ILogic";
import { IPlayer } from "../logic/IPlayer";
import { WareType } from "../logic/WareType";
import { getLogic } from "./data-registry/getLogic";
import { getPlayer } from "./data-registry/getPlayer";
import { headerIcon } from "./headerIcon";
import { KEYS, SVG_SIZE, wareViewConfig } from "./keys";
import { setDefaultTextStyle } from "./setDefaultTextStyle";
import { StoreWareButton } from "./StoreWareButton";
import { TakeWareButton } from "./TakeWareButton";
import { TextWarehouseWareQuantity } from "./TextWarehouseWareQuantity";

const WARE_ICON_SCALE = 50 / SVG_SIZE;
const HEADER_ICON_PX = 65;
export const HEADER_ICON_SCALE = HEADER_ICON_PX / SVG_SIZE;
const BASE_X = 0;
const BASE_Y = 500;
const RIGHT = 640 - 40;
const CENTER = RIGHT / 2;
const HEADER = 50;
const FIRST_ROW = HEADER + 50;
const SPACE_BETWEEN_ROWS = 60;
const COLUMN = {
    warehouse: 50,
    store: 150,
    storehouse: 180,
    ware: CENTER,
    take: 400,
    player: 500,
};

export class WarehouseScene extends Scene {
    private logic!: ILogic;
    private player!: IPlayer;
    private textWarehouseWareQuantities: TextWarehouseWareQuantity[] = [];

    constructor() {
        super({
            key: KEYS.scenes.warehouse,
        });
    }

    public create(): void {
        this.cameras.main.setPosition(BASE_X, BASE_Y);
        this.logic = getLogic(this);
        this.player = getPlayer(this);

        this.addBackground();
        this.addTable();
    }

    public update() {
        const update = (x: { update(): void }) => x.update();
        this.textWarehouseWareQuantities.forEach(update);
    }

    private addTable() {
        this.addHeader();
        Object.values(WareType).forEach((ware, i) => {
            this.addRow(ware, FIRST_ROW + i * SPACE_BETWEEN_ROWS);
        });
    }

    private addHeader() {
        this.add
            .image(COLUMN.warehouse, HEADER, KEYS.svgs.warehouse.key)
            .setOrigin(0, 0.35)
            .setScale(HEADER_ICON_SCALE * 0.7);
        headerIcon(this.add.image(COLUMN.player, HEADER, KEYS.svgs.ship.key));
        const addTextAtY = this.addTableText(HEADER);
        addTextAtY(COLUMN.storehouse, "Your storehouse");
    }

    private addRow(ware: WareType, y: number) {
        const addTextAtY = this.addTableText(y);
        const icon = wareViewConfig[ware].image;
        this.add
            .image(COLUMN.ware, y, icon.key)
            .setOrigin(0.5, 0.2)
            .setScale(WARE_ICON_SCALE);
        this.addWarehouseQuantityText(y, ware);
        this.addPlayerQuantityText(addTextAtY, ware);
        this.addTakeButton(y, ware);
        this.addStoreButton(y, ware);
    }

    private addTakeButton(y: number, ware: WareType) {
        const button = new TakeWareButton(this, COLUMN.take, y, "", {});
        this.children.add(button);
        button.init(this.logic, ware);
    }

    private addStoreButton(y: number, ware: WareType) {
        const button = new StoreWareButton(this, COLUMN.store, y, "", {});
        this.children.add(button);
        button.init(this.logic, ware);
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
        addTextAtY: (x: number, text: string) => GameObjects.Text,
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
            .image(0, 0, KEYS.images.parchment.key)
            .setOrigin(0)
            .setScale(1, 0.25 * Object.keys(WareType).length)
            .setAlpha(0.7);
    }
}
