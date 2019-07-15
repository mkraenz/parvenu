import { Data } from "phaser";
import { IObservable } from "../../logic/events/IObservable";
import { ILogic } from "../../logic/ILogic";
import { KEYS } from "../keys";

export const getLogic = (registryHolder: {
    registry: Data.DataManager;
}): ILogic & IObservable => registryHolder.registry.get(KEYS.registry.logic);
