import { uniq } from "lodash";
import { cityConfig } from "./City.config";
import { CityName } from "./CityName";
import { IObserver } from "./events/IObserver";
import { LogicEvent } from "./events/LogicEvents";
import { ICity } from "./ICity";
import { IInventory } from "./IInventory";
import { ILogic } from "./ILogic";
import { WareType } from "./WareType";

export interface IPlayer extends IInventory {
    pay: (price: number) => void;
}

export class Logic implements ILogic {
    public get city(): ICity {
        if (!this.cities.has(this.selectedCity)) {
            throw new Error(`City not found ${this.selectedCity}`);
        }
        return this.cities.get(this.selectedCity)!;
    }

    public tradedQuantity = 1;
    private selectedCity: CityName;
    private cities: Map<CityName, ICity>;
    private observers: IObserver[] = [];

    constructor(private player: IPlayer, cities: ICity[], startCity: CityName) {
        if (!cities.length) {
            throw new Error("Must provide at least one city");
        }

        const hasDuplicateName =
            uniq(cities.map(value => value.name)).length !== cities.length;
        if (hasDuplicateName) {
            throw new Error("City names must be unique.");
        }

        this.cities = new Map(cities.map(value => [value.name, value]));
        this.selectedCity = startCity;
    }

    public buildFactory(wareType: WareType): void {
        const price = this.city.getBuildFactoryPrice(wareType);
        const isWareProducedByCity = cityConfig.cities[
            this.city.name
        ].producedWares.includes(wareType);
        if (this.player.hasMoney(price) && isWareProducedByCity) {
            this.city.factories.set(
                wareType,
                this.city.getFactory(wareType) + 1
            );
            this.player.pay(price);
        }
    }

    public destroyFactory(wareType: WareType): void {
        if (this.city.factories.get(wareType)! > 0) {
            this.city.factories.set(
                wareType,
                this.city.getFactory(wareType) - 1
            );
        }
    }

    /** player takes from warehouse */
    public take(wareType: WareType): void {
        const warehouse = this.city.warehouse;
        // TODO consider making an interface IExchangeArgs = {wareType, tradedQuantity}
        if (warehouse.hasSufficientWares(wareType, this.tradedQuantity)) {
            warehouse.take(wareType, this.tradedQuantity);
            this.player.buy(wareType, this.tradedQuantity, 0);
        }
    }

    /** player stores in warehouse */
    public store(wareType: WareType): void {
        const warehouse = this.city.warehouse;
        if (this.player.isValidSell(wareType, this.tradedQuantity)) {
            warehouse.store(wareType, this.tradedQuantity);
            this.player.sell(wareType, this.tradedQuantity, 0);
        }
    }

    public setCity(selected: CityName) {
        this.selectedCity = selected;
        this.observers.forEach(observer =>
            observer.onLogicEvent({
                name: LogicEvent.CitySet,
                data: { city: this.city },
            })
        );
    }

    /** player buys */
    public buy(ware: WareType): void {
        const totalPrice = this.city.getBuyPrice(ware, this.tradedQuantity);
        this.trade(this.player, this.city, ware, totalPrice);
    }

    /** player sells */
    public sell(ware: WareType): void {
        const totalPrice = this.city.getSellPrice(ware, this.tradedQuantity);
        this.trade(this.city, this.player, ware, totalPrice);
    }

    public gameOver(): boolean {
        const waretypes = Object.values(WareType).map(type => type);
        for (const waretype of waretypes) {
            if (
                this.player.isValidSell(waretype, 1) ||
                // TODO #78 not ready for multi city
                this.player.hasMoney(this.city.getBuyPrice(waretype, 1))
            ) {
                return false;
            }
        }
        return true;
    }

    public register(observer: IObserver) {
        this.observers.push(observer);
    }

    private trade(
        buyer: IInventory,
        seller: IInventory,
        ware: WareType,
        totalPrice: number
    ) {
        if (
            seller.isValidSell(ware, this.tradedQuantity) &&
            buyer.hasMoney(totalPrice)
        ) {
            buyer.buy(ware, this.tradedQuantity, totalPrice);
            seller.sell(ware, this.tradedQuantity, totalPrice);
        }
    }
}
