import { Inventory } from "./Inventory";
import { IWarehouse } from "./IWarehouse";
import { WareType } from "./WareType";
export class Warehouse extends Inventory implements IWarehouse {
    public hasMoney(): boolean {
        throw new Error(
            "Method not implemented. Selling from the warehouse will be implemented in the future."
        );
    }

    public hasSufficientWares(type: WareType, quantity: number): boolean {
        return this.isValidSell(type, quantity);
    }

    // the player takes from the warehouse
    public take(type: WareType, quantity: number): void {
        // TODO #103 avoid messing up the average price
        this.sell(type, quantity, 0);
    }

    // player stores sth. in the warehosue
    public store(type: WareType, quantity: number): void {
        // TODO #103 avoid messing up the average price
        this.buy(type, quantity, 0);
    }
}
