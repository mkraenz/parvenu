import { WareType } from "./WareType";

export const wareConfig = {
    maxPrice: {
        [WareType.Furs]: 355,
        [WareType.Juwelry]: 670,
        [WareType.Salt]: 48,
        [WareType.Fish]: 10,
        [WareType.Beer]: 10,
    },
    minPrice: {
        [WareType.Furs]: 130,
        [WareType.Juwelry]: 215,
        [WareType.Salt]: 8,
        [WareType.Fish]: 10,
        [WareType.Beer]: 10,
    },
};
