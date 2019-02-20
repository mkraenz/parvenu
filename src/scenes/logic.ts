import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { WareType } from "./wareType";

export class Logic implements ILogic {
    private tradedQuantity = 1;

    constructor(private player: IInventory, private city: ICity) {}

    // TODO #22 add tests
    public getCityQuantityStream(ware: WareType) {
        return this.city.get(ware).getStream();
    }

    // TODO #22 add tests
    public getPlayerQuantityStream(ware: WareType) {
        return this.player.get(ware).getStream();
    }

    // TODO #22 add tests
    public getCityQuantity(ware: WareType): number {
        return this.city.get(ware).getQuantity();
    }

    // TODO #22 add tests
    public getPlayerQuantity(ware: WareType): number {
        return this.player.get(ware).getQuantity();
    }

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
