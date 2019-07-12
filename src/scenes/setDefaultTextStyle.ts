import { GameObjects } from "phaser";
import { Color } from "../Color";

export const setDefaultTextStyle = (text: GameObjects.Text) =>
    text
        .setFontFamily("Arial")
        .setFontSize(32)
        .setColor(Color.Black);
