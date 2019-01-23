import { Inventory } from "./inventory";
import { Logic } from "./logic";
import { Ware } from "./ware";
import { WareType } from "./WareType";

export class LogicBuilder {
    public static get() {
        // TODO #10
        const ware1 = new Ware(WareType.Furs, 10);
        return new Logic(new Inventory([ware1]), new Inventory([ware1]));
    }
}
