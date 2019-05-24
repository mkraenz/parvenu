import { MainScene } from "./scenes/mainScene";

export const gameConfig: GameConfig = {
    height: 600,
    parent: "game",
    physics: {
        arcade: {
            gravity: { y: 200 }
        },
        default: "arcade"
    },
    scene: MainScene,
    type: Phaser.AUTO,
    width: 800
};
