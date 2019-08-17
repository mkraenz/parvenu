import { City } from "./City";
import { CityName } from "./CityName";
import { IMainSceneParams } from "./IMainSceneParams";
import { Logic } from "./Logic";
import { Player } from "./Player";
import { Ware } from "./Ware";
import { Warehouse } from "./Warehouse";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const player = new Player(Ware.makeWaresOfEachType());
        const cities = Object.values(CityName).map(name => {
            const warehouse = new Warehouse(Ware.makeWaresOfEachType());
            return new City(Ware.makeWaresOfEachType(), name, warehouse);
        });
        return {
            city: cities[0],
            logic: new Logic(player, cities, CityName.Rostock),
            player,
            cities,
        };
    }
}
