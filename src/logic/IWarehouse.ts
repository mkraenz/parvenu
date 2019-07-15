import { IWare } from "./IWare";
import { WareType } from "./WareType";

export interface IWarehouse {
    get(ware: WareType): IWare;
    hasSufficientWares(type: WareType, quantity: number): boolean;
    take(type: WareType, quantity: number): void;
    store(type: WareType, quantity: number): void;
}
