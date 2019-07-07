import { CityName } from "./CityName";
import { WareType } from "./WareType";

const cities = {
    // NOTE: Mecklenburg is used in lots of test
    [CityName.Mecklenburg]: {
        name: CityName.Mecklenburg,
        producedWares: [WareType.Salt],
    },
    [CityName.Holstein]: {
        name: CityName.Holstein,
        producedWares: [WareType.Furs],
    },
};

export const cityConfig = {
    cities,
    /** The Player sells to the city for less than he buys. This factor describes that ratio. */
    sellToBuyPriceFactor: 0.82,
};
