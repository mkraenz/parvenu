import { IInventory } from "./i-inventory";

export class Inventory implements IInventory {
    constructor(public ware: number = 10) {}

    public isValidSell(quantity: number) {
        return this.ware - quantity >= 0;
    }

    public buy(quantity: number) {
        this.ware += quantity;
    }

    public sell(quantity: number) {
        if (this.isValidSell(quantity)) {
            this.ware -= quantity;
        }
    }
}
