import { CityName } from "./CityName";
import { IInventory } from "./IInventory";
import { IWare } from "./IWare";
import { IWarehouse } from "./IWarehouse";
import { WareType } from "./WareType";

export interface ICity extends IInventory {
    name: CityName;
    warehouse: IWarehouse;
    factories: Map<WareType, number>;
    getBuildFactoryPrice(wareType: WareType): number;
    getFactory(wareType: WareType): number;
    getSellPrice(ware: WareType, quantity: number): number;
    getBuyPrice(ware: WareType, quantity: number): number;
    get(ware: WareType): IWare;
    consumeAndProduce(): void;
}
