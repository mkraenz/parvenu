import { WareType } from "./WareType";

export const wareConfig = {
    maxPrice: {
        [WareType.Furs]: 355,
        [WareType.Jewelry]: 670,
        [WareType.Salt]: 48,
        [WareType.Fish]: 95,
        [WareType.Beer]: 95,
    },
    minPrice: {
        [WareType.Furs]: 130,
        [WareType.Jewelry]: 215,
        [WareType.Salt]: 8,
        [WareType.Fish]: 10,
        [WareType.Beer]: 10,
    },
};
