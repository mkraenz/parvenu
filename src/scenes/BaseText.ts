import { GameObjects, Scene, Types } from "phaser";
import { setDefaultTextStyle } from "./setDefaultTextStyle";

export class BaseText extends GameObjects.Text {
    constructor(
        scene: Scene,
        x: number,
        y: number,
        text: string | string[],
        style: Types.GameObjects.Text.TextStyle
    ) {
        super(scene, x, y, text, style);
        setDefaultTextStyle(this);
    }
}
