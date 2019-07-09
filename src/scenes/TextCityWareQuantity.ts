import { ICity } from "../logic/ICity";
import { WareType } from "../logic/WareType";
import { BaseText } from "./BaseText";

interface ILogic {
    city: Pick<ICity, "get">;
}

export class TextCityWareQuantity extends BaseText {
    private logic!: ILogic;
    private wareType!: WareType;

    public init(logic: ILogic, type: WareType) {
        this.logic = logic;
        this.wareType = type;
    }

    public update() {
        this.setText(`${this.logic.city.get(this.wareType).getQuantity()}`);
    }
}
