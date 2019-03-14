import { ILogic } from "./i-logic";
import { IPlayer } from "./IPlayer";

export interface IMainSceneParams {
    logic: ILogic;
    player: IPlayer;
}
