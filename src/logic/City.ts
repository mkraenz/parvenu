import { cityConfig } from "./City.config";
import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { Inventory } from "./Inventory";
import { IWareForCity } from "./IWareForCity";
import { WareType } from "./WareType";

export class City extends Inventory implements ICity {
    constructor(wares: IWareForCity[], public readonly name: CityName) {
        super(wares);
    }

    public get(type: WareType): IWareForCity {
        return super.get(type) as IWareForCity;
    }

    /** player sells to city */
    public getSellPrice(ware: WareType, tradedQuantity: number): number {
        const theWare = this.get(ware);
        const currentStock = theWare.getQuantity();

        let totalPrice = 0;
        for (
            let quantity = currentStock;
            quantity < currentStock + tradedQuantity;
            quantity++
        ) {
            totalPrice += this.getPrice(theWare, quantity);
        }
        return Math.round(totalPrice * cityConfig.sellToBuyPriceFactor);
    }

    /** player buys from city */
    public getBuyPrice(ware: WareType, tradedQuantity: number): number {
        const theWare = this.get(ware);
        const currentStock = theWare.getQuantity();
        let totalPrice = 0;
        for (
            let quantity = currentStock;
            quantity > currentStock - tradedQuantity;
            quantity--
        ) {
            totalPrice += this.getPrice(theWare, quantity);
        }
        return Math.round(totalPrice);
    }

    public hasMoney(_: number) {
        return true;
    }

    public consumeOrProduce() {
        this.wares.forEach(ware => {
            if (this.isProduced(ware.type)) {
                ware.add(1);
                return;
            }
            if (ware.getQuantity() > 0) {
                ware.add(-1);
                return;
            }
        });
    }

    private getPrice(ware: IWareForCity, quantity: number): number {
        if (quantity === 0) {
            return ware.maxPrice;
        }
        return (ware.maxPrice - ware.minPrice) / quantity + ware.minPrice;
    }

    private isProduced(type: WareType): boolean {
        return cityConfig.cities[this.name].producedWares.includes(type);
    }
}
