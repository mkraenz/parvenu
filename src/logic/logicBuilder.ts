import { City } from "./City";
import { CityName } from "./CityName";
import { IMainSceneParams } from "./IMainSceneParams";
import { Logic } from "./Logic";
import { Player } from "./Player";
import { Ware } from "./ware";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const player = new Player(Ware.makeWaresOfEachType());
        const cities = Object.values(CityName).map(
            name => new City(Ware.makeWaresOfEachType(), name)
        );
        return {
            city: cities[0],
            logic: new Logic(player, cities, CityName.Mecklenburg),
            player,
            cities,
        };
    }
}
