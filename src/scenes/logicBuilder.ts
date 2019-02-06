import { Inventory } from "./inventory";
import { Logic } from "./logic";
import { Ware } from "./ware";

export class LogicBuilder {
    public static get() {
        const player = new Inventory(Ware.getWaresOfEachType());
        const city = new Inventory(Ware.getWaresOfEachType());
        return new Logic(player, city);
    }
}
