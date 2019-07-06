import { Scene } from "phaser";
import { gameConfig } from "../game-config";
import { KEYS } from "./keys";
export class EndScene extends Scene {
    constructor() {
        super({
            key: KEYS.scenes.end,
        });
    }

    public preload() {
        this.load.image("gameOver", "./assets/images/gameOver.png");
    }

    public create() {
        this.add
            .image(0, 0, "gameOver")
            .setOrigin(0)
            .setScale(
                (gameConfig.width as number) / 500,
                (gameConfig.height as number) / 300
            );
    }
}
