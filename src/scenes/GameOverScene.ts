import { Scene } from "phaser";
import { KEYS } from "./keys";
export class GameOverScene extends Scene {
    constructor() {
        super({
            key: KEYS.scenes.gameOver,
        });
    }

    public preload() {
        this.load.image("gameOver", "./assets/images/gameOver.png");
    }

    public create() {
        this.add
            .image(0, 0, "gameOver")
            .setOrigin(0)
            .setScale(this.scale.width / 500, this.scale.height / 300);
    }
}
