import { GameObjects } from "phaser";
import { setDefaultTextStyle } from "./setDefaultTextStyle";

export class BaseText extends GameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string | string[],
        style: Phaser.Types.GameObjects.Text.TextSyle
    ) {
        super(scene, x, y, text, style);
        setDefaultTextStyle(this);
    }
}
