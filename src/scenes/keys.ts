const scenify = (str: string) => `${str}-scene`;

export const KEYS = {
    scenes: {
        main: scenify("main"),
        citySelection: scenify("city-selection"),
        table: scenify("table"),
    },
    // key of the corresponding objects inside the global data registry
    registry: {
        logic: "logic",
        cities: "cities",
        player: "player",
    },
};
