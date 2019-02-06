import { IInventory } from "./i-inventory";
import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export class Inventory implements IInventory {
    private wares: Map<WareType, IWare>;

    /** During production, make sure that we have an `IWare` for each `WareType` */
    constructor(wares: IWare[]) {
        this.wares = new Map<WareType, IWare>();
        wares.map(ware => this.wares.set(ware.type, ware));
    }

    /** Assumes existing ware for each type */
    public get(type: WareType): IWare {
        if (!this.wares.has(type)) {
            throw new Error(`WareType not found ${type}`);
        }
        return this.wares.get(type)!;
    }

    public isValidSell(type: WareType, quantity: number) {
        return this.get(type).quantity - quantity >= 0;
    }

    public buy(type: WareType, quantity: number) {
        this.get(type).quantity += quantity;
    }

    public sell(type: WareType, quantity: number) {
        if (this.isValidSell(type, quantity)) {
            this.get(type).quantity -= quantity;
        }
    }
}
