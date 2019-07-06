import { IInventory } from "./i-inventory";
import { IWare } from "./i-ware";
import { WareType } from "./wareType";

export interface IPlayer extends IInventory {
    setMoney(money: number): void;
    getMoney(): number;
    get(ware: WareType): IWare;
}
