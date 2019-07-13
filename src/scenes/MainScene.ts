import { Scene } from "phaser";
import { CityName } from "../logic/CityName";
import { ICity } from "../logic/ICity";
import { ILogic } from "../logic/ILogic";
import { IMainSceneParams } from "../logic/IMainSceneParams";
import { logicConfig } from "../logic/Logic.config";
import { LogicBuilder } from "../logic/LogicBuilder";
import { CitySelectionScene } from "./CitySelectionScene";
import { getCities } from "./data-registry/getCities";
import { getLogic } from "./data-registry/getLogic";
import { cityViewConfig, KEYS } from "./keys";
import { TableScene } from "./TableScene";

export class MainScene extends Scene {
    private logic!: ILogic;
    private cities!: ICity[];
    private cityName!: CityName;

    constructor() {
        super({
            key: KEYS.scenes.main,
        });
    }

    public create(): void {
        const logicObjects = LogicBuilder.create();
        this.setRegistry(logicObjects);

        this.logic = getLogic(this);
        this.cities = getCities(this);
        this.cityName = this.logic.city.name;

        this.addBackgroundMusic();
        this.addBackground(this.cityName);

        this.scene.add(KEYS.scenes.citySelection, CitySelectionScene, true);
        this.scene.add(KEYS.scenes.table, TableScene, true);

        this.time.addEvent({
            callback: () =>
                this.cities.forEach(city => city.consumeAndProduce()),
            delay: logicConfig.cityConsumeTime,
            loop: true,
        });

        // TODO #78 REMOVE debug shortcut
        this.input.keyboard.on("keydown-G", () => this.gotoGameOver());
    }

    public update() {
        if (this.logic.gameOver()) {
            this.gotoGameOver();
        }
        if (this.logic.city.name !== this.cityName) {
            this.switchCity();
        }
    }

    private switchCity() {
        // TODO make selected city changes a phaser event
        this.cityName = this.logic.city.name;
        this.addBackground(this.logic.city.name);
    }

    private gotoGameOver() {
        this.sound.stopAll();
        this.scene.remove(KEYS.scenes.citySelection);
        this.scene.remove(KEYS.scenes.table);
        this.scene.start(KEYS.scenes.gameOver);
    }

    private setRegistry(logicObjects: IMainSceneParams) {
        this.registry.set(KEYS.registry.logic, logicObjects.logic);
        this.registry.set(KEYS.registry.cities, logicObjects.cities);
        this.registry.set(KEYS.registry.player, logicObjects.player);
    }

    private addBackgroundMusic() {
        this.sound
            .add(KEYS.sound.backgroundMusic.key)
            .play("", { volume: 0.3, loop: true });
    }

    private addBackground(name: CityName) {
        const image = cityViewConfig[name].backgroundImage;
        this.add
            .image(0, 0, image.key)
            .setOrigin(0)
            .setScale(
                this.scale.width / image.width,
                this.scale.height / image.height
            );
    }
}
