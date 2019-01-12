import { Inventory } from "./inventory";

export class MainSceneLogic {
    private player: Inventory;
    private city: Inventory;

    constructor() {
        this.player = new Inventory();
        this.city = new Inventory();
    }

    public buy(): void {
        this.trade(this.player, this.city);
    }

    public sell(): void {
        this.trade(this.city, this.player);
    }

    private trade(buyer: Inventory, seller: Inventory) {
        const quantity = 1;
        if (seller.isValidSell(quantity)) {
            buyer.buy(quantity);
            seller.sell(quantity);
        }
        this.logInventories();
    }

    private logInventories() {
        // TODO use GUI instead of console logs
        // tslint:disable:no-console
        console.log(`player: ${this.player.ware}`);
        console.log(`city: ${this.city.ware}`);
    }
}
