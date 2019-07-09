import { Color } from "../Color";
import { WareType } from "../logic//WareType";
import { ICity } from "../logic/ICity";
import { ILogic as ILogicBase } from "../logic/ILogic";
import { BaseText } from "./BaseText";
import { KEYS } from "./keys";

interface ILogic extends Pick<ILogicBase, "sell"> {
    city: Pick<ICity, "getSellPrice">;
}

export class TextSellPrice extends BaseText {
    private logic!: ILogic;
    private wareType!: WareType;

    public init(logic: ILogic, type: WareType) {
        this.logic = logic;
        this.wareType = type;

        const graphics = this.scene.add.graphics();
        graphics.fillStyle(Color.White, 0.7);
        graphics.fillRoundedRect(this.x - 5, this.y - 5, 70, 50);
        // draw on top of the graphics. Might make problems late when e.g. other panel is in front of this text,
        this.depth = 1;

        // super random values although they should be equal to fillRoundedRect()
        const clickZone = this.scene.add.zone(this.x + 30, this.y + 20, 70, 50);
        clickZone.setInteractive();
        clickZone.on("pointerdown", () => {
            this.logic.sell(this.wareType);
            this.scene.sound.play(KEYS.sound.sell);
        });
    }

    public update() {
        this.setText(`${this.logic.city.getSellPrice(this.wareType, 1)}`);
    }
}
