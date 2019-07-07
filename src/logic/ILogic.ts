import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { WareType } from "./wareType";

export interface ILogic {
    city: ICity;
    buy(ware: WareType): void;
    sell(ware: WareType): void;
    gameOver(): boolean;
    setCity(selected: CityName): void;
}
