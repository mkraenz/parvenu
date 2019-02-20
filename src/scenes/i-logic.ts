import { Observable } from "rxjs";
import { WareType } from "./wareType";

export interface ILogic {
    getCityQuantity(ware: WareType): number;
    getPlayerQuantity(ware: WareType): number;
    getCityQuantityStream(ware: WareType): Observable<number>;
    getPlayerQuantityStream(ware: WareType): Observable<number>;
    buy(ware: WareType): void;
    sell(ware: WareType): void;
}
