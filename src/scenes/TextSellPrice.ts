import { GameObjects } from "phaser";
import { Color } from "../Color";
import { WareType } from "../logic//wareType";
import { ICity } from "../logic/ICity";

interface ILogic {
    city: Pick<ICity, "getSellPrice">;
}

export class TextSellPrice extends GameObjects.Text {
    private logic!: ILogic;
    private wareType!: WareType;

    public init(logic: ILogic, type: WareType) {
        this.logic = logic;
        this.wareType = type;
        this.setFontFamily("Arial")
            .setFontSize(32)
            .setColor(Color.Black);
    }

    public update() {
        this.setText(`${this.logic.city.getSellPrice(this.wareType, 1)}`);
    }
}
