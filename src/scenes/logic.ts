import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { WareType } from "./WareType";

export class Logic implements ILogic {
    constructor(private player: IInventory, private city: IInventory) {}

    public buy(): void {
        this.trade(this.player, this.city);
    }

    public sell(): void {
        this.trade(this.city, this.player);
    }

    private trade(buyer: IInventory, seller: IInventory) {
        const quantity = 1;
        const type = WareType.Furs;
        // TODO #10
        if (seller.isValidSell(type, quantity)) {
            buyer.buy(type, quantity);
            seller.sell(type, quantity);
        }
    }
}
