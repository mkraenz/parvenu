import { GameObjects } from "phaser";
import { Color } from "../Color";

export class BaseText extends GameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string | string[],
        style: Phaser.Types.GameObjects.Text.TextSyle
    ) {
        super(scene, x, y, text, style);
        this.setFontFamily("Arial")
            .setFontSize(32)
            .setColor(Color.Black);
    }
}
