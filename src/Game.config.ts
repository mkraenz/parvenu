import { Types } from "phaser";
import { GameOverScene } from "./scenes/GameOverScene";
import { LoadingScene } from "./scenes/LoadingScene";
import { MainScene } from "./scenes/MainScene";

export const gameConfig: Types.Core.GameConfig = {
    height: window.innerHeight,
    width: window.innerWidth,
    parent: "game",
    scene: [LoadingScene, MainScene, GameOverScene],
    type: Phaser.AUTO,
};
