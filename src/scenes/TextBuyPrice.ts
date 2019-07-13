import { GameObjects } from "phaser";
import { WareType } from "../logic//WareType";
import { ICity } from "../logic/ICity";
import { ILogic as ILogicBase } from "../logic/ILogic";
import { BaseText } from "./BaseText";
import { getTradeButtonTweenConfig } from "./getTradeButtonTweenConfig";
import { KEYS } from "./keys";

interface ILogic extends Pick<ILogicBase, "buy"> {
    city: Pick<ICity, "getBuyPrice">;
}

export class TextBuyPrice extends BaseText {
    private logic!: ILogic;
    private wareType!: WareType;
    private button!: GameObjects.Image;

    public init(logic: ILogic, type: WareType) {
        this.logic = logic;
        this.wareType = type;

        this.addButton();
        this.addClickZone();
    }

    public update() {
        this.setText(`${this.logic.city.getBuyPrice(this.wareType, 1)}`);
    }

    private addClickZone() {
        // super random values although they should be equal to fillRoundedRect()
        const clickZone = this.scene.add.zone(this.x + 30, this.y + 20, 70, 50);
        clickZone.setInteractive();
        clickZone.on("pointerdown", () => this.onButtonClick());
    }

    private onButtonClick() {
        // TODO #106 only play sound / tween on successful sell
        this.logic.buy(this.wareType);
        this.scene.sound.play(KEYS.sound.sell.key);
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
