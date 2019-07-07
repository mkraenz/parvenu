import { IWare } from "./IWare";

export interface IWareForCity extends IWare {
    readonly maxPrice: number;
    readonly minPrice: number;
}
