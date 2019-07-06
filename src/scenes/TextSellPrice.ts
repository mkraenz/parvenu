import { GameObjects } from "phaser";
import { Color } from "../Color";
import { ICity } from "./ICity";
import { WareType } from "./wareType";

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
