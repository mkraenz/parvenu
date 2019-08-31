import { KEYS } from "./keys";
import { WareButton } from "./WareButton";

export class TextSellPrice extends WareButton {
    protected IMAGE_KEY = KEYS.images.buttonUpArrowLeft;

    public update() {
        this.setText(`${this.logic.city.getSellPrice(this.wareType, 1)}`);
    }

    protected logicCallBackOnClick(): void {
        this.logic.sell(this.wareType);
    }
}
