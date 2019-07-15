import { WareButton } from "./WareButton";

export class TakeWareButton extends WareButton {
    protected logicCallBackOnClick(): void {
        this.logic.take(this.wareType);
    }
}
