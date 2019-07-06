import { Observable } from "rxjs";
import { WareType } from "./wareType";

export interface IWare {
    readonly type: WareType;
    getQuantity(): number;
    add(quantity: number): void;
    getStream(): Observable<number>;
}
