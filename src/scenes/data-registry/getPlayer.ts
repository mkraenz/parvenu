import { Data } from "phaser";
import { IPlayer } from "../IPlayer";
import { KEYS } from "../keys";

export const getPlayer = (registryHolder: {
    registry: Data.DataManager;
}): IPlayer => registryHolder.registry.get(KEYS.registry.player);
