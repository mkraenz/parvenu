import { IWare } from "./i-ware";
import { WareType } from "./WareType";

export class Ware implements IWare {
    public static getWaresOfEachType(): Ware[] {
        return Object.values(WareType).map(type => new Ware(type, 10));
    }

    public quantity: number;
    public readonly type: WareType;

    constructor(type: WareType, quantity: number) {
        this.quantity = quantity;
        this.type = type;
    }
}
