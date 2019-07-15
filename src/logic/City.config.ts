import { CityName } from "./CityName";
import { WareType } from "./WareType";

const cities = {
    // NOTE: Mecklenburg is used in lots of test
    [CityName.Mecklenburg]: {
        name: CityName.Mecklenburg,
        producedWares: [WareType.Salt, WareType.Fish],
    },
    [CityName.Holstein]: {
        name: CityName.Holstein,
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
