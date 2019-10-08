import { GameObjects, Scene } from "phaser";
import { cityConfig } from "../logic/City.config";
import { ILogic } from "../logic/ILogic";
import { WareType } from "../logic/WareType";
import { ObjectKeys } from "../utils/ObjectKeys";
import { BuildFactoryButton } from "./BuildFactoryButton";
import { getLogic } from "./data-registry/getLogic";
import { DestroyFactoryButton } from "./DestroyFactoryButton";
import { headerIcon } from "./headerIcon";
import { KEYS, SVG_SIZE, wareViewConfig } from "./keys";
import { setDefaultTextStyle } from "./setDefaultTextStyle";
import { TextFactoryCount } from "./TextFactoryCount";

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
    destroy: 150,
    storehouse: 180,
    ware: CENTER,
    build: 400,
    player: 500,
};
interface ITableRow {
    ware: WareType;
    icon: GameObjects.Image;
    factoryCountText: TextFactoryCount;
    buildButton: BuildFactoryButton;
    destroyButton: DestroyFactoryButton;
}

export class FactoryScene extends Scene {
    private logic!: ILogic;
    private textFactoryCount: TextFactoryCount[] = [];
    private rows: ITableRow[] = [];
    private buildButtons: BuildFactoryButton[] = [];

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

        this.events.on(KEYS.events.cityChanged, () => this.handleCityChanged());
    }

    public update() {
        const update = (x: { update(): void }) => x.update();
        this.textFactoryCount.forEach(update);
        this.buildButtons.forEach(update);
    }

    private addTable() {
        this.addHeader();
        Object.values(WareType).forEach((ware, i) => {
            this.addRow(ware, FIRST_ROW + i * SPACE_BETWEEN_ROWS);
        });
        // initially setting active or inactive
        this.handleCityChanged();
    }

    private addHeader() {
        headerIcon(
            this.add.image(COLUMN.player, HEADER, KEYS.svgs.factory.key)
        );
        const addTextAtY = this.addTableText(HEADER);
        addTextAtY(COLUMN.storehouse, "Your factories");
    }

    private addRow(ware: WareType, y: number) {
        const image = wareViewConfig[ware].image;
        const icon = this.add
            .image(COLUMN.ware, y, image.key)
            .setOrigin(0.5, 0.2)
            .setScale(WARE_ICON_SCALE);
        const factoryCountText = this.addFactoryText(y, ware);
        const buildButton = this.addBuildButton(y, ware);
        const destroyButton = this.addDestroyButton(y, ware);

        this.rows.push({
            buildButton,
            destroyButton,
            factoryCountText,
            icon,
            ware,
        });
    }

    private addFactoryText(y: number, ware: WareType) {
        const text = new TextFactoryCount(this, COLUMN.player, y, "", {});
        this.textFactoryCount.push(text);
        this.children.add(text);
        text.init(this.logic.city, ware);
        return text;
    }

    private addBuildButton(y: number, ware: WareType) {
        const button = new BuildFactoryButton(
            this,
            COLUMN.build,
            y,
            "",
            {}
        ).setScale(0.8);
        this.buildButtons.push(button);
        this.children.add(button);
        button.init(this.logic, ware);
        return button;
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
        return button;
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

    private handleCityChanged() {
        this.rows.forEach(setActive);
        const city = this.logic.city;
        this.rows.forEach(row => {
            const isWareProducedByCity = cityConfig.cities[
                city.name
            ].producedWares.includes(row.ware);
            if (!isWareProducedByCity) {
                setInactive(row);
            }
        });
    }
}

function setInactive(row: ITableRow) {
    ObjectKeys(row).forEach(key => {
        if (key !== "ware") {
            row[key].setAlpha(0.3).disableInteractive();
        }
    });
}

function setActive(row: ITableRow) {
    ObjectKeys(row).forEach(key => {
        if (key !== "ware") {
            row[key].setAlpha(1);
        }
        if (key === "buildButton" || key === "destroyButton") {
            row[key].setInteractive();
        }
    });
}
