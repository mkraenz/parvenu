import { CityName } from "./CityName";
import { IInventory } from "./IInventory";
import { IWare } from "./IWare";
import { WareType } from "./wareType";

export interface ICity extends IInventory {
    name: CityName;
    getSellPrice(ware: WareType, quantity: number): number;
    getBuyPrice(ware: WareType, quantity: number): number;
    get(ware: WareType): IWare;
    consume(): void;
}
