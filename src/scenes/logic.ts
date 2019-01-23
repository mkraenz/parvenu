import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { WareType } from "./WareType";

export class Logic implements ILogic {
    constructor(private player: IInventory, private city: IInventory) {}

    public buy(ware: WareType): void {
        this.trade(this.player, this.city, ware);
    }

    public sell(ware: WareType): void {
        this.trade(this.city, this.player, ware);
    }

    private trade(buyer: IInventory, seller: IInventory, ware: WareType) {
        const quantity = 1;
        if (seller.isValidSell(ware, quantity)) {
            buyer.buy(ware, quantity);
            seller.sell(ware, quantity);
        }
    }
}
