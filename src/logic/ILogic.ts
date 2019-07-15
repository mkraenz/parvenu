import { CityName } from "./CityName";
import { ICity } from "./ICity";
import { WareType } from "./WareType";

export interface ILogic {
    city: ICity;
    setTradedQuantity(quantity: number): void;
    buy(ware: WareType): void;
    sell(ware: WareType): void;
    gameOver(): boolean;
    setCity(selected: CityName): void;
    store(wareType: WareType): void;
    take(wareType: WareType): void;
}
