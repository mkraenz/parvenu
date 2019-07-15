import { Observable } from "rxjs";
import { WareType } from "./WareType";

export interface IWare {
    readonly type: WareType;
    getQuantity(): number;
    add(quantity: number): void;
    getQuantity$(): Observable<number>;
}
