import { GameObjects } from "phaser";
import { Color, toHex } from "../Color";
import { ICity } from "../logic/ICity";
import { ILogic as ILogicBase } from "../logic/ILogic";
import { BaseText } from "./BaseText";
import { getTradeButtonTweenConfig } from "./getTradeButtonTweenConfig";
import { KEYS } from "./keys";
import { TableScene } from "./TableScene";

interface ILogic extends Pick<ILogicBase, "buy" | "tradedQuantity"> {
    city: Pick<ICity, "getBuyPrice">;
}

const POINTER_DOWN = "pointerdown";

export class QuantityButton extends BaseText {
    public selected = false;
    private logic!: ILogic;
    private quantityX!: number;
    private button!: GameObjects.Image;
    private clickZone!: GameObjects.Zone;

    public init(logic: ILogic, quantity: number, selected = false) {
        this.logic = logic;
        this.quantityX = quantity;
        this.selected = selected;

        this.addButton();
        this.addClickZone();
    }

    public update() {
        if (this.selected) {
            this.button.setTint(toHex(Color.Yellow));
            this.clickZone.removeAllListeners(POINTER_DOWN);
        } else {
            this.button.setTint(-1);
            if (this.clickZone.listenerCount(POINTER_DOWN) === 0) {
                this.clickZone.on(POINTER_DOWN, () => this.onButtonClick());
            }
        }
    }

    public get quantity() {
        return this.quantityX;
    }

    private addClickZone() {
        // super random values although they should be equal to fillRoundedRect()
        this.clickZone = this.scene.add.zone(this.x + 30, this.y + 20, 70, 50);
        this.clickZone.setInteractive();
    }

    private onButtonClick() {
        // TODO #106 only play sound / tween on successful buy
        this.logic.tradedQuantity = this.quantity;
        this.scene.sound.play(KEYS.sound.menuClick.key);
        this.scene.add.tween(getTradeButtonTweenConfig(this.button));
        (this.scene as TableScene).setSelectedTradedQuantityButton(
            this.quantity
        );
        this.selected = true;
    }

    private addButton() {
        const buttonCfg = KEYS.images.buttonUpRect;
        this.button = this.scene.add
            .image(this.x + 29, this.y + 19, buttonCfg.key)
            .setScale(0.36);
        // text on top of button
        this.depth = 1;
    }
}
