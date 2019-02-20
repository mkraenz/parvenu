import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { WareType } from "./wareType";

export class Logic implements ILogic {
    private tradedQuantity = 1;

    constructor(private player: IInventory, private city: IInventory) {}

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

    public buy(ware: WareType): void {
        this.trade(this.player, this.city, ware);
    }

    public sell(ware: WareType): void {
        this.trade(this.city, this.player, ware);
    }

    private trade(buyer: IInventory, seller: IInventory, ware: WareType) {
        if (seller.isValidSell(ware, this.tradedQuantity)) {
            buyer.buy(ware, this.tradedQuantity);
            seller.sell(ware, this.tradedQuantity);
        }
    }
}
