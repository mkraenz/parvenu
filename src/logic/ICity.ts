import { CityName } from "./CityName";
import { IWare } from "./i-ware";
import { IInventory } from "./IInventory";
import { WareType } from "./wareType";

export interface ICity extends IInventory {
    name: CityName;
    getSellPrice(ware: WareType, quantity: number): number;
    getBuyPrice(ware: WareType, quantity: number): number;
    get(ware: WareType): IWare;
    consume(): void;
}
