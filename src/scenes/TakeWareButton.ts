import { KEYS } from "./keys";
import { WareButton } from "./WareButton";

export class TakeWareButton extends WareButton {
    protected IMAGE_KEY = KEYS.images.buttonUpArrowRight;

    protected logicCallBackOnClick(): void {
        this.logic.take(this.wareType);
    }
}
