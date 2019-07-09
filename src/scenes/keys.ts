const scenify = (str: string) => `${str}-scene`;

export const KEYS = {
    scenes: {
        gameOver: scenify("game-over"),
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
    sound: {
        sell: "sell-sfx",
        buy: "buy-sfx",
        backgroundMusic: "background-music",
    },
    images: {
        background: "background-img",
    },
};
