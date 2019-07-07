import { Types } from "phaser";
import { GameOverScene } from "./scenes/GameOverScene";
import { MainScene } from "./scenes/MainScene";

export const gameConfig: Types.Core.GameConfig = {
    height: window.innerHeight,
    width: window.innerWidth,
    parent: "game",
    scene: [MainScene, GameOverScene],
    type: Phaser.AUTO,
};
