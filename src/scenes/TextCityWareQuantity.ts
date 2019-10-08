import { ICity } from "../logic/ICity";
import { IWare as ILogicWare } from "../logic/IWare";
import { BaseText } from "./BaseText";
import { KEYS } from "./keys";

type IWare = Pick<ILogicWare, "getQuantity" | "type">;

export class TextCityWareQuantity extends BaseText {
    private ware!: IWare;

    public init(ware: IWare) {
        this.ware = ware;
        this.scene.events.addListener(
            KEYS.events.cityChanged,
            (event: { city: Pick<ICity, "get"> }) => {
                this.ware = event.city.get(this.ware.type);
            }
        );
    }

    public update() {
        this.setText(`${this.ware.getQuantity()}`);
    }
}
