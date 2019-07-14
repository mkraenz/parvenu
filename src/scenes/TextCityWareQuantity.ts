import { ICity } from "../logic/ICity";
import { WareType } from "../logic/WareType";
import { BaseText } from "./BaseText";

interface IWare {
    type: WareType;
    getQuantity(): number;
}

export class TextCityWareQuantity extends BaseText {
    private ware!: IWare;

    public init(ware: IWare) {
        this.ware = ware;
        this.scene.events.addListener(
            "city-changed",
            (event: { city: Pick<ICity, "get"> }) => {
                this.ware = event.city.get(this.ware.type);
            }
        );
    }

    public update() {
        this.setText(`${this.ware.getQuantity()}`);
    }
}
