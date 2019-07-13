import { Scene } from "phaser";
import { KEYS } from "./keys";
export class GameOverScene extends Scene {
    constructor() {
        super({
            key: KEYS.scenes.gameOver,
        });
    }

    public create() {
        const image = KEYS.images.gameOver;
        this.add
            .image(0, 0, image.key)
            .setOrigin(0)
            .setScale(
                this.scale.width / image.width,
                this.scale.height / image.height
            );
    }
}
