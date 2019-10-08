import { cityConfig } from "./City.config";
import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { Inventory } from "./Inventory";
import { IWareForCity } from "./IWareForCity";
import { IWarehouse } from "./IWarehouse";
import { wareConfig } from "./Ware.config";
import { WareType } from "./WareType";

export class City extends Inventory implements ICity {
    constructor(
        wares: IWareForCity[],
        public readonly name: CityName,
        public warehouse: IWarehouse,
        public factories: Map<WareType, number> = new Map(
            Object.values(WareType).map(type => [type, 0])
        )
    ) {
        super(wares);
    }

    public getBuildFactoryPrice(wareType: WareType): number {
        return Math.ceil(wareConfig.maxPrice[wareType] * 10.5);
    }

    public getFactory(type: WareType): number {
        /* safe by assumption */
        return this.factories.get(type)!;
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

    public consumeAndProduce() {
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
        this.playerFactoriesProduce();
    }

    private playerFactoriesProduce() {
        this.wares.forEach(ware => {
            const type = ware.type;
            const increase = this.getFactory(type);
            this.warehouse.store(type, increase);
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
