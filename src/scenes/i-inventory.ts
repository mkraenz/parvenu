import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export interface IInventory {
    get(ware: WareType): IWare;
    isValidSell(type: WareType, quantity: number): boolean;
    buy(type: WareType, quantity: number): void;
    sell(type: WareType, quantity: number): void;
}
