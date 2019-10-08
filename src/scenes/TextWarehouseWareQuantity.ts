import { ICity } from "../logic/ICity";
import { IWare as ILogicWare } from "../logic/IWare";
import { BaseText } from "./BaseText";
import { KEYS } from "./keys";

type IWare = Pick<ILogicWare, "getQuantity" | "type">;

export class TextWarehouseWareQuantity extends BaseText {
    private ware!: IWare;

    public init(ware: IWare) {
        this.ware = ware;
        this.scene.events.addListener(
            KEYS.events.cityChanged,
            (event: { city: Pick<ICity, "warehouse"> }) => {
                this.ware = event.city.warehouse.get(this.ware.type);
            }
        );
    }

    public update() {
        this.setText(`${this.ware.getQuantity()}`);
    }
}
