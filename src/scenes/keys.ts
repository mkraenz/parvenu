import { CityName } from "../logic/CityName";
import { WareType } from "../logic/WareType";

const scenify = (str: string) => `${str}-scene`;
const imgify = (str: string) => `${str}-img`;
const sfxify = (str: string) => `${str}-sfx`;

export const KEYS = {
    events: {
        cityChanged: "city-changed",
    },
    scenes: {
        citySelection: scenify("city-selection"),
        gameOver: scenify("game-over"),
        loading: scenify("loading"),
        main: scenify("main"),
        table: scenify("table"),
        warehouse: scenify("warehouse"),
    },
    // key of the corresponding objects inside the global data registry
    registry: {
        cities: "cities",
        logic: "logic",
        player: "player",
    },
    sound: {
        sell: {
            key: sfxify("sell"),
            path: "./assets/sounds/sell.mp3",
        },
        buy: {
            key: sfxify("buy"),
            path: "./assets/sounds/buy.mp3",
        },
        menuClick: {
            key: sfxify("menu-click"),
            path: "./assets/sounds/menu-click.mp3",
        },
        backgroundMusic: {
            key: "background-music",
            path: "./assets/sounds/bgm.mp3",
        },
    },
    images: {
        culemborgCastle: {
            key: imgify("culemborg-castle"),
            path: "./assets/images/culemborg-castle800x524.png",
            width: 800,
            height: 524,
        },
        heltishCastle: {
            key: imgify("heltish-castle"),
            path: "./assets/images/background500x300.png",
            width: 500,
            height: 300,
        },
        harborWithBoats: {
            key: imgify("harbor-with-boats"),
            path:
                "./assets/images/Claude_Monet_Fishing_Boats_Leaving_the_Harbor_Le_Havre_1178×713px.jpg",
            width: 1178,
            height: 713,
        },
        gameOver: {
            key: imgify("game-over"),
            path: "./assets/images/game-over501x301.png",
            width: 501,
            height: 301,
        },
        parchment: {
            key: imgify("parchment"),
            path: "./assets/images/parchment640x480.png",
            width: 640,
            height: 480,
        },
        buttonUpRect: {
            key: imgify("button-up-rect"),
            path: "./assets/images/button-up-rect198x128.png",
            width: 200,
            height: 200,
        },
        buttonUpArrowLeft: {
            key: imgify("button-up-arrow-left"),
            path: "./assets/images/button-up-arrow-left236x128.png",
            width: 236,
            height: 128,
        },
        buttonUpArrowRight: {
            key: imgify("button-up-arrow-right"),
            path: "./assets/images/button-up-arrow-right230x128.png",
            width: 230,
            height: 128,
        },
    },
    svgs: {
        ship: {
            key: imgify("ship"),
            path: "./assets/images/other/ship-3-mast.svg",
        },
        warehouse: {
            key: imgify("warehouse"),
            path: "./assets/images/other/storage-boxes.svg",
        },
        beer: {
            key: imgify("beer"),
            path: "./assets/images/wares/beer.svg",
        },
        bricks: {
            key: imgify("bricks"),
            path: "./assets/images/wares/bricks.svg",
        },
        fish: {
            key: imgify("fish"),
            path: "./assets/images/wares/fish.svg",
        },
        furs: {
            key: imgify("furs"),
            path: "./assets/images/wares/furs.svg",
        },
        jewelry: {
            key: imgify("jewelry"),
            path: "./assets/images/wares/jewelry.svg",
        },
        moneybag: {
            key: imgify("moneybag"),
            path: "./assets/images/other/money-bag.svg",
        },
        spice: {
            key: imgify("spice"),
            path: "./assets/images/wares/spice.svg",
        },
        village: {
            key: imgify("village"),
            path: "./assets/images/other/village.svg",
        },
        wood: {
            key: imgify("wood"),
            path: "./assets/images/wares/wood.svg",
        },
    },
};

export const cityViewConfig = {
    [CityName.Rostock]: {
        backgroundImage: KEYS.images.culemborgCastle,
    },
    [CityName.Hamburg]: {
        backgroundImage: KEYS.images.harborWithBoats,
    },
    [CityName.Wismar]: {
        backgroundImage: KEYS.images.heltishCastle,
    },
};

export const wareViewConfig = {
    [WareType.Beer]: {
        image: KEYS.svgs.beer,
    },
    [WareType.Fish]: {
        image: KEYS.svgs.fish,
    },
    [WareType.Furs]: {
        image: KEYS.svgs.furs,
    },
    // TODO FIX TYPO jewelry
    [WareType.Jewelry]: {
        image: KEYS.svgs.jewelry,
    },
    [WareType.Salt]: {
        image: KEYS.svgs.spice,
    },
};

/** svg files have uniform size and are quadratic. see `assets/images/README.md` */
export const SVG_SIZE = 512;
