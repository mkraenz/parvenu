import { WareType } from "./wareType";

export interface ILogic {
    randomEvent(): void;
    buy(ware: WareType): void;
    sell(ware: WareType): void;
    gameOver(): boolean;
}
