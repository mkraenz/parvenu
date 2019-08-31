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
        ship: {
            key: imgify("ship"),
            path: "./assets/images/ship389x288.png",
            width: 389,
            height: 288,
        },
        portTown: {
            key: imgify("port-town"),
            path: "./assets/images/view-on-a-port-town413x268.png",
            width: 389,
            height: 288,
        },
        warehouse: {
            key: imgify("warehouse"),
            path: "./assets/images/crates367x340.png",
            width: 367,
            height: 340,
        },
        moneybag: {
            key: imgify("moneybag"),
            path: "./assets/images/moneybag250x224.png",
            width: 250,
            height: 224,
        },
        beer: {
            key: imgify("beer"),
            path: "./assets/images/wares/beer512x512.png",
            width: 512,
            height: 512,
        },
        bricks: {
            key: imgify("bricks"),
            path: "./assets/images/wares/bricks194x157.png",
            width: 194,
            height: 157,
        },
        fish: {
            key: imgify("fish"),
            path: "./assets/images/wares/fish512x512.png",
            width: 512,
            height: 512,
        },
        furs: {
            key: imgify("furs"),
            path: "./assets/images/wares/furs512x512.png",
            width: 512,
            height: 512,
        },
        jewelry: {
            key: imgify("jewelry"),
            path: "./assets/images/wares/jewelry512x512.png",
            width: 512,
            height: 512,
        },
        spice: {
            key: imgify("spice"),
            path: "./assets/images/wares/spice512x512.png",
            width: 512,
            height: 512,
        },
        wood: {
            key: imgify("wood"),
            path: "./assets/images/wares/wood512x512.png",
            width: 512,
            height: 512,
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
        image: KEYS.images.beer,
    },
    [WareType.Fish]: {
        image: KEYS.images.fish,
    },
    [WareType.Furs]: {
        image: KEYS.images.furs,
    },
    // TODO FIX TYPO jewelry
    [WareType.Jewelry]: {
        image: KEYS.images.jewelry,
    },
    [WareType.Salt]: {
        image: KEYS.images.spice,
    },
};
