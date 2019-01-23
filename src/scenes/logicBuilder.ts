import { Inventory } from "./inventory";
import { Logic } from "./logic";
import { Ware } from "./ware";
import { WareType } from "./WareType";

export class LogicBuilder {
    public static get() {
        // TODO #10
        const player = new Inventory([new Ware(WareType.Furs, 10)]);
        const city = new Inventory([new Ware(WareType.Furs, 10)]);
        return new Logic(player, city);
    }
}
