const scenify = (str: string) => `${str}-scene`;

export const KEYS = {
    scenes: {
        end: scenify("end"),
        citySelection: scenify("city-selection"),
        main: scenify("main"),
        table: scenify("table"),
    },
    // key of the corresponding objects inside the global data registry
    registry: {
        cities: "cities",
        logic: "logic",
        player: "player",
    },
};
