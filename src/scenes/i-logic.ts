import { WareType } from "./WareType";

export interface ILogic {
    buy(ware: WareType): void;
    sell(ware: WareType): void;
}
