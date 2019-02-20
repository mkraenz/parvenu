import { City } from "./City";
import { Logic } from "./logic";
import { Player } from "./Player";
import { Ware } from "./ware";

export class LogicBuilder {
    public static get() {
        const player = new Player(Ware.getWaresOfEachType());
        const city = new City(Ware.getWaresOfEachType());
        return new Logic(player, city);
    }
}
