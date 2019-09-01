import { GameObjects } from "phaser";
import { HEADER_ICON_SCALE } from "./WarehouseScene";

export const headerIcon = (icon: GameObjects.Image) => {
    icon.setOrigin(0, 0.5).setScale(HEADER_ICON_SCALE);
};
