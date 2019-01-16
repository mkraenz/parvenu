import { WareType } from "./WareType";

export interface IInventory {
    isValidSell(type: WareType, quantity: number): boolean;
    buy(type: WareType, quantity: number): void;
    sell(type: WareType, quantity: number): void;
}
