import { Scene } from "phaser";
import { gameConfig } from "../Game.config";
import { ICity } from "../logic/ICity";
import { ILogic } from "../logic/ILogic";
import { IMainSceneParams } from "../logic/IMainSceneParams";
import { logicConfig } from "../logic/Logic.config";
import { LogicBuilder } from "../logic/LogicBuilder";
import { CitySelectionScene } from "./CitySelectionScene";
import { getCities } from "./data-registry/getCities";
import { getLogic } from "./data-registry/getLogic";
import { KEYS } from "./keys";
import { TableScene } from "./TableScene";

export class MainScene extends Scene {
    private logic!: ILogic;
    private cities!: ICity[];

    constructor() {
        super({
            key: KEYS.scenes.main,
        });
    }

    public preload(): void {
        this.load.image("buy", "./assets/images/buy.png");
        this.load.image("sell", "./assets/images/sell.png");
        this.load.image("background", "./assets/images/background500x300.png");
        this.load.audio("buy", "./assets/sounds/buy.wav");
        this.load.audio("sell", "./assets/sounds/sell.wav");
        this.load.audio("background", "./assets/sounds/bgm.mp3");
    }

    public create(): void {
        const logicObjects = LogicBuilder.create();
        this.setRegistry(logicObjects);

        this.logic = getLogic(this);
        this.cities = getCities(this);

        this.addBackgroundMusic();
        this.addBackground();

        this.scene.add(KEYS.scenes.citySelection, CitySelectionScene, true);
        this.scene.add(KEYS.scenes.table, TableScene, true);

        this.time.addEvent({
            callback: () =>
                this.cities.forEach(city => city.consumeAndProduce()),
            delay: logicConfig.cityConsumeTime,
            loop: true,
        });
    }

    public update() {
        if (this.logic.gameOver()) {
            this.sound.removeByKey("background");
            this.scene.remove(KEYS.scenes.citySelection);
            this.scene.remove(KEYS.scenes.table);
            this.scene.start(KEYS.scenes.gameOver);
        }
    }

    private setRegistry(logicObjects: IMainSceneParams) {
        this.registry.set(KEYS.registry.logic, logicObjects.logic);
        this.registry.set(KEYS.registry.cities, logicObjects.cities);
        this.registry.set(KEYS.registry.player, logicObjects.player);
    }

    private addBackgroundMusic() {
        this.sound.add("background").play("", { loop: true });
    }

    private addBackground() {
        this.add
            .image(0, 0, "background")
            .setOrigin(0)
            .setScale(
                (gameConfig.width as number) / 500,
                (gameConfig.height as number) / 300
            );
    }
}
