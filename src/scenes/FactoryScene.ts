import { Scene } from "phaser";
import { ILogic } from "../logic/ILogic";
import { WareType } from "../logic/WareType";
import { BuildFactoryButton } from "./BuildFactoryButton";
import { getLogic } from "./data-registry/getLogic";
import { DestroyFactoryButton } from "./DestroyFactoryButton";
import { headerIcon } from "./headerIcon";
import { KEYS, SVG_SIZE, wareViewConfig } from "./keys";
import { setDefaultTextStyle } from "./setDefaultTextStyle";
import { TextWarehouseWareQuantity } from "./TextWarehouseWareQuantity";

const BASE_X = 700;
const BASE_Y = 500;
const WARE_ICON_SCALE = 50 / SVG_SIZE;
const HEADER_ICON_PX = 65;
export const HEADER_ICON_SCALE = HEADER_ICON_PX / SVG_SIZE;
const RIGHT = 640 - 40;
const CENTER = RIGHT / 2;
const HEADER = 50;
const FIRST_ROW = HEADER + 50;
const SPACE_BETWEEN_ROWS = 60;
const COLUMN = {
    warehouse: 50,
    destroy: 150,
    storehouse: 180,
    ware: CENTER,
    build: 400,
    player: 500,
};

export class FactoryScene extends Scene {
    private logic!: ILogic;
    private textWarehouseWareQuantities: TextWarehouseWareQuantity[] = [];

    constructor() {
        super({
            key: KEYS.scenes.factory,
        });
    }

    public create(): void {
        this.cameras.main.setPosition(BASE_X, BASE_Y);
        this.logic = getLogic(this);

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
        headerIcon(
            this.add.image(COLUMN.player, HEADER, KEYS.svgs.factory.key)
        );
        const addTextAtY = this.addTableText(HEADER);
        addTextAtY(COLUMN.storehouse, "Your factories");
    }

    private addRow(ware: WareType, y: number) {
        const icon = wareViewConfig[ware].image;
        this.add
            .image(COLUMN.ware, y, icon.key)
            .setOrigin(0.5, 0.2)
            .setScale(WARE_ICON_SCALE);
        this.addWarehouseQuantityText(y, ware);
        this.addBuildButton(y, ware);
        this.addDestroyButton(y, ware);
    }

    private addWarehouseQuantityText(y: number, ware: WareType) {
        const text = new TextWarehouseWareQuantity(
            this,
            COLUMN.player,
            y,
            "",
            {}
        );
        this.textWarehouseWareQuantities.push(text);
        this.children.add(text);
        text.init(this.logic.city.warehouse.get(ware));
    }

    private addBuildButton(y: number, ware: WareType) {
        const button = new BuildFactoryButton(
            this,
            COLUMN.build,
            y,
            "build",
            {}
        ).setScale(0.8);
        this.children.add(button);
        button.init(this.logic, ware);
    }

    private addDestroyButton(y: number, ware: WareType) {
        const button = new DestroyFactoryButton(
            this,
            COLUMN.destroy,
            y,
            "destroy",
            {}
        ).setScale(0.6);
        this.children.add(button);
        button.init(this.logic, ware);
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
