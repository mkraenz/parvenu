import { ILogicEvent } from "./ILogicEvent";

export interface IObserver {
    onLogicEvent: (event: ILogicEvent) => void;
}
