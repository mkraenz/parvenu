import { KEYS } from "./keys";
import { WareButton } from "./WareButton";

export class BuildFactoryButton extends WareButton {
    protected IMAGE_KEY = KEYS.images.buttonUpArrowRight;

    protected logicCallBackOnClick(): void {
        this.logic.buildFactory(this.wareType);
    }
}
