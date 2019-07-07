import { IWare } from "./IWare";
import { WareType } from "./wareType";

export interface IPlayer {
    getMoney(): number;
    get(ware: WareType): IWare;
}
