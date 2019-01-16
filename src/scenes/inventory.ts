import { IInventory } from "./i-inventory";
import { IWare } from "./i-ware";
import { WareType } from "./WareType";

export class Inventory implements IInventory {
    private wares: Map<WareType, IWare>;

    constructor(wares: IWare[]) {
        this.wares = new Map<WareType, IWare>();
        wares.map(ware => this.wares.set(ware.type, ware));
    }

    /** Assumes existing ware for each type */
    public get(type: WareType): IWare {
        return this.wares.get(type)!;
    }

    public isValidSell(type: WareType, quantity: number) {
        return this.wares.get(type)!.quantity - quantity >= 0;
    }

    public buy(type: WareType, quantity: number) {
        this.wares.get(type)!.quantity += quantity;
    }

    public sell(type: WareType, quantity: number) {
        if (this.isValidSell(type, quantity)) {
            this.wares.get(type)!.quantity -= quantity;
        }
    }
}
