import { WareButton } from "./WareButton";

export class StoreWareButton extends WareButton {
    protected logicCallBackOnClick(): void {
        this.logic.store(this.wareType);
    }
}
