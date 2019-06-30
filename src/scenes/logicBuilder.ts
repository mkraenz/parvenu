import { City } from "./City";
import { CityName } from "./CityName";
import { IMainSceneParams } from "./IMainSceneParams";
import { Logic } from "./logic";
import { Player } from "./Player";
import { Ware } from "./ware";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const player = new Player(Ware.getWaresOfEachType());
        const city = new City(Ware.getWaresOfEachType(), CityName.Mecklenburg);
        return {
            city,
            logic: new Logic(player, [city], CityName.Mecklenburg),
            player,
        };
    }
}
