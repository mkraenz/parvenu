import { IObserver } from "./IObserver";

export interface IObservable {
    register(observer: IObserver): void;
}
