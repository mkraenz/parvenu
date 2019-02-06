import { WareType } from "./wareType";

export interface IWare {
    quantity: number;
    readonly type: WareType;
}
