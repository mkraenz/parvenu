import { WareType } from "./WareType";

export interface IWare {
    quantity: number;
    readonly type: WareType;
}
