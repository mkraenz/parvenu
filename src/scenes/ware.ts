import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export class Ware implements IWare {
    public static getWaresOfEachType(): Ware[] {
        return Object.values(WareType).map(type => new Ware(type, 10));
    }

    constructor(public readonly type: WareType, public quantity: number) {}
}
