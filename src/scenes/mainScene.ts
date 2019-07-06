import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { logicConfig } from "../logic.config";
import { CitySelectionScene } from "./CitySelectionScene";
import { getLogic } from "./data-registry/getLogic";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { KEYS } from "./keys";
import { LogicBuilder } from "./logicBuilder";
import { TableScene } from "./TableScene";

export class MainScene extends Scene {
    private logic!: ILogic;
    private city!: ICity;

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
        this.load.image("test", "./assets/images/test.png");
    }

    public create(): void {
        const logicObjects = LogicBuilder.create();
        this.registry.set(KEYS.registry.logic, logicObjects.logic);
        this.registry.set(KEYS.registry.cities, logicObjects.cities);
        this.registry.set(KEYS.registry.player, logicObjects.player);
        this.logic = getLogic(this);
        this.city = this.logic.city;

        this.addBackgroundMusic();
        this.addBackground();

        this.scene.add(KEYS.scenes.citySelection, CitySelectionScene, true);
        this.scene.add(KEYS.scenes.table, TableScene, true);

        this.time.addEvent({
            // TODO #44 adapt to multi city
            callback: () => this.city.consume(),
            delay: logicConfig.cityConsumeTime,
            loop: true,
        });
    }

    public update() {
        if (this.logic.gameOver()) {
            this.sound.removeByKey("background");
            this.scene.start("EndScene");
        }
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
