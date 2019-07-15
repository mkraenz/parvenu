import { GameObjects } from "phaser";
import { ICity } from "../logic/ICity";
import { ILogic as ILogicBase } from "../logic/ILogic";
import { BaseText } from "./BaseText";
import { getTradeButtonTweenConfig } from "./getTradeButtonTweenConfig";
import { KEYS } from "./keys";

interface ILogic extends Pick<ILogicBase, "buy" | "setTradedQuantity"> {
    city: Pick<ICity, "getBuyPrice">;
}

export class QuantityButton extends BaseText {
    private logic!: ILogic;
    private button!: GameObjects.Image;
    private quantity!: number;

    public init(logic: ILogic, quantity: number) {
        this.logic = logic;
        this.quantity = quantity;

        this.addButton();
        this.addClickZone();
    }

    private addClickZone() {
        // super random values although they should be equal to fillRoundedRect()
        const clickZone = this.scene.add.zone(this.x + 30, this.y + 20, 70, 50);
        clickZone.setInteractive();
        clickZone.on("pointerdown", () => this.onButtonClick());
    }

    private onButtonClick() {
        // TODO #106 only play sound / tween on successful buy
        this.logic.setTradedQuantity(this.quantity);
        this.scene.sound.play(KEYS.sound.buy.key);
        this.scene.add.tween(getTradeButtonTweenConfig(this.button));
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
