import { KEYS } from "./keys";
import { WareButton } from "./WareButton";

export class DestroyFactoryButton extends WareButton {
    protected IMAGE_KEY = KEYS.images.buttonUpArrowLeft;

    protected logicCallBackOnClick(): void {
        this.logic.destroyFactory(this.wareType);
    }
}
