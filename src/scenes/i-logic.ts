import { WareType } from "./wareType";

export interface ILogic {
    getCityQuantity(ware: WareType): number;
    getPlayerQuantity(ware: WareType): number;
    buy(ware: WareType): void;
    sell(ware: WareType): void;
}
