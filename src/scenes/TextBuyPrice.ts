import { KEYS } from "./keys";
import { WareButton } from "./WareButton";

export class TextBuyPrice extends WareButton {
    protected IMAGE_KEY = KEYS.images.buttonUpArrowRight;

    public update() {
        this.setText(`${this.logic.city.getBuyPrice(this.wareType, 1)}`);
    }

    protected logicCallBackOnClick(): void {
        this.logic.buy(this.wareType);
    }
}
