import { KEYS } from "./keys";
import { WareButton } from "./WareButton";

export class StoreWareButton extends WareButton {
    protected IMAGE_KEY = KEYS.images.buttonUpArrowLeft;

    protected logicCallBackOnClick(): void {
        this.logic.store(this.wareType);
    }
}
