import { ICity as ILogicCity } from "../logic/ICity";
import { WareType } from "../logic/WareType";
import { BaseText } from "./BaseText";

type ICity = Pick<ILogicCity, "getFactory">;

export class TextFactoryCount extends BaseText {
    private city!: ICity;
    private wareType!: WareType;

    public init(city: ICity, wareType: WareType) {
        this.city = city;
        this.wareType = wareType;
        this.scene.events.addListener(
            "city-changed",
            (event: { city: Pick<ICity, "getFactory"> }) => {
                this.city = event.city;
            }
        );
    }

    public update() {
        this.setText(`${this.city.getFactory(this.wareType)}`);
    }
}
