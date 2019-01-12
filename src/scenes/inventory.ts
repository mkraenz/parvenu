export class Inventory {
    public readonly startQuantity = 10;
    public ware = this.startQuantity;

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
