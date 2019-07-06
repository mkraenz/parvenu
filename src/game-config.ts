import { Types } from "phaser";
import { EndScene } from "./scenes/EndScene";
import { MainScene } from "./scenes/mainScene";
export const gameConfig: Types.Core.GameConfig = {
    height: window.innerHeight,
    width: window.innerWidth,
    parent: "game",
    scene: [MainScene, EndScene],
    type: Phaser.AUTO,
};
