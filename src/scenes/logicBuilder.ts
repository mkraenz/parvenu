import { City } from "./City";
import { IMainSceneParams } from "./IMainSceneParams";
import { Logic } from "./logic";
import { Player } from "./Player";
import { Ware } from "./ware";

export class LogicBuilder {
    public static create(): IMainSceneParams {
        const player = new Player(Ware.getWaresOfEachType());
        const city = new City(Ware.getWaresOfEachType());
        return {
            city,
            logic: new Logic(player, city),
            player
        };
    }
}
