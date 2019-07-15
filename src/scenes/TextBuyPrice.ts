import { WareButton } from "./WareButton";

export class TextBuyPrice extends WareButton {
    public update() {
        this.setText(`${this.logic.city.getBuyPrice(this.wareType, 1)}`);
    }

    protected logicCallBackOnClick(): void {
        this.logic.buy(this.wareType);
    }
}
