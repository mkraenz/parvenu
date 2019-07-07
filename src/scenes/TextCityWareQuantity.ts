import { GameObjects } from "phaser";
import { Color } from "../Color";
import { ICity } from "../logic/ICity";
import { WareType } from "../logic/wareType";

interface ILogic {
    city: Pick<ICity, "get">;
}

export class TextCityWareQuantity extends GameObjects.Text {
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
        this.setText(`${this.logic.city.get(this.wareType).getQuantity()}`);
    }
}
