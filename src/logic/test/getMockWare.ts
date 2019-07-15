import { WareType } from "../WareType";
import { doNothing } from "./doNothing";

export const getMockWare = () => ({
    add: doNothing,
    getQuantity: () => 0,
    getQuantity$: undefined as any,
    maxPrice: 355,
    minPrice: 130,
    type: WareType.Furs,
});
