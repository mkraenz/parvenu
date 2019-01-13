import { IInventory } from "./i-inventory";

export class MainSceneLogic {
    constructor(private player: IInventory, private city: IInventory) {}

    public buy(): void {
        this.trade(this.player, this.city);
    }

    public sell(): void {
        this.trade(this.city, this.player);
    }

    private trade(buyer: IInventory, seller: IInventory) {
        const quantity = 1;
        if (seller.isValidSell(quantity)) {
            buyer.buy(quantity);
            seller.sell(quantity);
        }
    }
}
