import { GameObjects } from "phaser";
import { WareType } from "../logic//WareType";
import { ILogic } from "../logic/ILogic";
import { BaseText } from "./BaseText";
import { getTradeButtonTweenConfig } from "./getTradeButtonTweenConfig";
import { KEYS } from "./keys";

export abstract class WareButton extends BaseText {
    protected logic!: ILogic;
    protected wareType!: WareType;
    protected IMAGE_KEY = KEYS.images.buttonUpRect;
    private button!: GameObjects.Image;
    private clickZone!: GameObjects.Zone;

    public init(logic: ILogic, type: WareType) {
        this.logic = logic;
        this.wareType = type;

        this.addButton();
        this.addClickZone();
    }

    public disableInteractive() {
        // disableInteractive() should still disable interactivity on everything, including the text
        super.disableInteractive();
        this.clickZone.disableInteractive();
        return this;
    }

    public setInteractive() {
        // do not call super.setInteractive(), instead send everything to the clickzone
        this.clickZone.setInteractive();
        return this;
    }

    public setAlpha(alpha?: number | undefined) {
        super.setAlpha(alpha);
        this.button.setAlpha(alpha);
        return this;
    }

    protected abstract logicCallBackOnClick(): void;

    private addClickZone() {
        // super random values although they should be equal to fillRoundedRect()
        this.clickZone = this.scene.add.zone(this.x + 30, this.y + 20, 70, 50);
        this.clickZone.setInteractive();
        this.clickZone.on("pointerdown", () => this.handleButtonClicked());
    }

    private handleButtonClicked() {
        // TODO #106 only play sound / tween on successful buy
        this.logicCallBackOnClick();
        this.scene.sound.play(KEYS.sound.buy.key);
        this.scene.add.tween(getTradeButtonTweenConfig(this.button));
    }

    private addButton() {
        const buttonCfg = this.IMAGE_KEY;
        this.button = this.scene.add
            .image(this.x + 29, this.y + 19, buttonCfg.key)
            .setScale(0.36);
        this.depth = 1;
    }
}
