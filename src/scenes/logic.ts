import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { WareType } from "./wareType";

export class Logic implements ILogic {
    private tradedQuantity = 1;

    constructor(private player: IInventory, private city: ICity) {}

    /** player buys */
    public buy(ware: WareType): void {
        const totalPrice = this.city.getBuyPrice(ware, this.tradedQuantity);
        this.trade(this.player, this.city, ware, totalPrice);
    }

    /** player sells */
    public sell(ware: WareType): void {
        const totalPrice = this.city.getSellPrice(ware, this.tradedQuantity);
        this.trade(this.city, this.player, ware, totalPrice);
    }
    public gameOver(): boolean {
        const waretypes = Object.values(WareType).map(type => type);
        for (const waretype of waretypes) {
            if (
                this.player.isValidSell(waretype, 1) ||
                this.player.hasMoney(this.city.getBuyPrice(waretype, 1))
            ) {
                return false;
            }
        }
        return true;
    }
    private trade(
        buyer: IInventory,
        seller: IInventory,
        ware: WareType,
        totalPrice: number
    ) {
        if (
            seller.isValidSell(ware, this.tradedQuantity) &&
            buyer.hasMoney(totalPrice)
        ) {
            buyer.buy(ware, this.tradedQuantity, totalPrice);
            seller.sell(ware, this.tradedQuantity, totalPrice);
        }
    }
}
