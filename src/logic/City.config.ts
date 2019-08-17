import { CityName } from "./CityName";
import { WareType } from "./WareType";

const cities = {
    // NOTE: Rostock is used in lots of test
    [CityName.Rostock]: {
        name: CityName.Rostock,
        producedWares: [WareType.Salt, WareType.Fish],
    },
    [CityName.Hamburg]: {
        name: CityName.Hamburg,
        producedWares: [WareType.Furs],
    },
    [CityName.Wismar]: {
        name: CityName.Wismar,
        producedWares: [WareType.Beer],
    },
};

export const cityConfig = {
    cities,
    /** The Player sells to the city for less than he buys. This factor describes that ratio. */
    sellToBuyPriceFactor: 0.82,
};
