import { Subject } from "rxjs";
import { IWare } from "./IWare";
import { wareConfig } from "./Ware.config";
import { WareType } from "./WareType";

export class Ware implements IWare {
    public static makeWaresOfEachType(): Ware[] {
        return Object.values(WareType).map(type => new Ware(type, 1));
    }

    private quantity$ = new Subject<number>();

    constructor(public readonly type: WareType, private quantity: number) {
        this.quantity$.subscribe(quantityEvent => {
            this.quantity = quantityEvent;
        });
        this.quantity$.next(quantity);
    }

    public get maxPrice(): number {
        return wareConfig.maxPrice[this.type];
    }

    public get minPrice(): number {
        return wareConfig.minPrice[this.type];
    }

    public setQuantity(quantity: number) {
        this.quantity$.next(quantity);
    }

    public add(quantity: number) {
        this.setQuantity(this.quantity + quantity);
    }

    public getStream() {
        return this.quantity$;
    }

    public getQuantity() {
        return this.quantity;
    }
}
