import { ICity } from "./ICity";
import { Inventory } from "./inventory";
import { WareType } from "./wareType";

export class City extends Inventory implements ICity {
    /** player sells to city */
    public getSellPrice(ware: WareType, tradedQuantity: number): number {
        const stock = this.get(ware).getQuantity();
        if (stock < 5) {
            return 2 * this.get(ware).price * tradedQuantity;
        } else {
            return this.get(ware).price * tradedQuantity;
        }
    }

    /** player buys from city */
    public getBuyPrice(ware: WareType, tradedQuantity: number): number {
        const premium = 2;
        const stock = this.get(ware).getQuantity();
        if (stock <= 5) {
            return 2 * premium * this.get(ware).price * tradedQuantity;
        } else {
            return premium * this.get(ware).price * tradedQuantity;
        }
    }

    public hasMoney(_: number) {
        return true;
    }
}
