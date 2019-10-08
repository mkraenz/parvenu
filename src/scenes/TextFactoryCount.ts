import { ICity as ILogicCity } from "../logic/ICity";
import { WareType } from "../logic/WareType";
import { BaseText } from "./BaseText";
import { KEYS } from "./keys";

type ICity = Pick<ILogicCity, "getFactory">;

export class TextFactoryCount extends BaseText {
    private city!: ICity;
    private wareType!: WareType;

    public init(city: ICity, wareType: WareType) {
        this.city = city;
        this.wareType = wareType;
        this.scene.events.addListener(
            KEYS.events.cityChanged,
            (event: { city: Pick<ICity, "getFactory"> }) => {
                this.city = event.city;
            }
        );
    }

    public update() {
        this.setText(`${this.city.getFactory(this.wareType)}`);
    }
}
