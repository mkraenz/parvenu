import { IInventory } from "./i-inventory";
import { WareType } from "./wareType";

export interface ICity extends IInventory {
    getSellPrice(ware: WareType, quantity: number): number;
    getBuyPrice(ware: WareType, quantity: number): number;
}