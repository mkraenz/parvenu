import { IWare } from "./IWare";
import { WareType } from "./WareType";

export interface IInventory {
    hasMoney(totalPrice: number): boolean;
    get(ware: WareType): IWare;
    isValidSell(type: WareType, quantity: number): boolean;
    buy(type: WareType, quantity: number, totalPrice: number): void;
    sell(type: WareType, quantity: number, totalPrice: number): void;
}
