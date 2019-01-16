import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export class Ware implements IWare {
    public quantity: number;
    public readonly type: WareType;

    constructor(quantity: number, type: WareType) {
        this.quantity = quantity;
        this.type = type;
    }
}
