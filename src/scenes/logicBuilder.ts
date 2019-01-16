import { Inventory } from "./inventory";
import { Logic } from "./logic";

export class LogicBuilder {
    public static get() {
        return new Logic(new Inventory(), new Inventory());
    }
}
