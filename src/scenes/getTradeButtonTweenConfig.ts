import { GameObjects } from "phaser";

export const getTradeButtonTweenConfig = (button: GameObjects.Image) => ({
    targets: button,
    scaleX: 0.3,
    scaleY: 0.3,
    duration: 50,
    repeat: 0,
    yoyo: true,
});
