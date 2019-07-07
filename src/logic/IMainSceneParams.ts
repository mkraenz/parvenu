import { ICity } from "./ICity";
import { ILogic } from "./ILogic";
import { IPlayer } from "./IPlayer";

export interface IMainSceneParams {
    logic: ILogic;
    player: IPlayer;
    city: ICity;
    cities: ICity[];
}
