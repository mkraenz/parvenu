import { IWare } from "./IWare";
import { WareType } from "./WareType";

export interface IPlayer {
    getMoney(): number;
    get(ware: WareType): IWare;
}
