import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { WareType } from "./wareType";

export class Logic implements ILogic {
    private quantity = 1;

    constructor(private player: IInventory, private city: IInventory) {}

    public getCityQuantity(ware: WareType): number {
        return this.city.get(ware).quantity;
    }
    public getPlayerQuantity(ware: WareType): number {
        return this.player.get(ware).quantity;
    }

    public buy(ware: WareType): void {
        this.trade(this.player, this.city, ware);
    }

    public sell(ware: WareType): void {
        this.trade(this.city, this.player, ware);
    }

    private trade(buyer: IInventory, seller: IInventory, ware: WareType) {
        if (seller.isValidSell(ware, this.quantity)) {
            buyer.buy(ware, this.quantity);
            seller.sell(ware, this.quantity);
        }
    }
}
