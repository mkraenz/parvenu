import { Types } from "phaser";
import { EndScene } from "./scenes/EndScene";
import { MainScene } from "./scenes/mainScene";
export const gameConfig: Types.Core.GameConfig = {
    height: 600,
    parent: "game",
    scene: [MainScene, EndScene],
    type: Phaser.AUTO,
    width: 800,
};
