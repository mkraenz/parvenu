import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export interface IInventory {
    setWare(ware: WareType, quantity: number): void;
    hasMoney(totalPrice: number): boolean;
    get(ware: WareType): IWare;
    isValidSell(type: WareType, quantity: number): boolean;
    buy(type: WareType, quantity: number, totalPrice: number): void;
    sell(type: WareType, quantity: number, totalPrice: number): void;
}
