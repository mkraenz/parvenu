// tslint:disable:no-unused-expression

import { expect, use } from "chai";
import { stubFalse } from "lodash";
import * as sinon from "sinon";
import { spy } from "sinon";
import * as sinonChai from "sinon-chai";
import { CityName } from "./CityName";
import { IObserver } from "./events/IObserver";
import { LogicEvent } from "./events/LogicEvents";
import { ICity } from "./ICity";
import { IWarehouse } from "./IWarehouse";
import { IPlayer, Logic } from "./Logic";
import { doNothing } from "./test/doNothing";
import { getMockWarehouse } from "./test/getMockWarehouse";
import { WareType } from "./WareType";

use(sinonChai);

const buyPrice = 1234;
const sellPrice = 2345;
const saltFactories = 5;

describe("Logic", () => {
    let player: IPlayer;
    let city: ICity;
    let stub: sinon.SinonStub;
    let logic: Logic;
    let warehouse: IWarehouse;

    beforeEach(() => {
        stub = sinon.stub();
        player = {
            buy: doNothing,
            get: null as any,
            hasMoney: () => true,
            isValidSell: () => true,
            sell: doNothing,
            pay: doNothing,
        };
        warehouse = getMockWarehouse();
        city = getMockCity(CityName.Rostock, warehouse);
        logic = new Logic(player, [city], CityName.Rostock);
    });

    const type = WareType.Salt;
    const quantity = 1; // Should match Logic.quantity

    describe("buy()", () => {
        it("checks if city can sell correct waretype", () => {
            city.isValidSell = stub;

            logic.buy(type);

            expect(city.isValidSell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls city.getBuyPrice() exactly once", () => {
            city.getBuyPrice = stub;

            logic.buy(type);
            expect(city.getBuyPrice).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("checks if player has money", () => {
            player.hasMoney = stub;

            logic.buy(type);

            expect(player.hasMoney).to.have.been.calledOnceWithExactly(
                quantity * buyPrice
            );
        });
        it("calls player.buy() with correct params", () => {
            player.buy = stub;

            logic.buy(type);

            expect(player.buy).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                buyPrice
            );
        });
        it("calls city.sell() with correct params", () => {
            city.sell = stub;

            logic.buy(type);

            expect(city.sell).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                buyPrice
            );
        });
        it("does nothing on player if city cannot sell", () => {
            city.isValidSell = stubFalse;
            player.buy = stub;

            logic.buy(type);

            expect(player.buy).to.have.not.been.called;
        });
        it("does nothing on city if city cannot sell", () => {
            city.isValidSell = stubFalse;
            city.sell = stub;

            logic.buy(type);

            expect(city.sell).to.have.not.been.called;
        });
    });

    describe("sell()", () => {
        it("checks if player can sell correct waretype", () => {
            player.isValidSell = stub;

            logic.sell(type);

            expect(player.isValidSell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls city.buy() with correct params ", () => {
            city.buy = stub;

            logic.sell(type);

            expect(city.buy).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                sellPrice
            );
        });
        it("calls city.getSellPrice() with correct params", () => {
            city.getSellPrice = stub;

            logic.sell(type);

            expect(city.getSellPrice).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls player.sell() with correct params", () => {
            player.sell = stub;

            logic.sell(type);

            expect(player.sell).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                sellPrice
            );
        });
        it("does nothing on city if player cannot sell", () => {
            player.isValidSell = stubFalse;
            city.buy = stub;

            logic.sell(type);

            expect(city.buy).to.have.not.been.called;
        });
        it("does nothing on player if player cannot sell", () => {
            player.isValidSell = stubFalse;
            player.sell = stub;

            logic.sell(type);

            expect(player.sell).to.have.not.been.called;
        });
    });

    describe("gameOver()", () => {
        it("returns false if player has wares but is broke", () => {
            player.hasMoney = stubFalse;

            const result = logic.gameOver();

            expect(result).to.be.false;
        });
        it("returns false if player is not broke but no wares", () => {
            player.isValidSell = stubFalse;

            const result = logic.gameOver();

            expect(result).to.be.false;
        });
        it("returns true if player is broke and has no wares", () => {
            player.isValidSell = stubFalse;
            player.hasMoney = stubFalse;

            const result = logic.gameOver();

            expect(result).to.be.true;
        });
    });

    describe("new", () => {
        it("throws on empty cities array", () => {
            const resultFn = () => new Logic(null as any, [], CityName.Rostock);

            expect(resultFn).to.throw(/Must provide at least one city/i);
        });

        it("throws on duplicate city name", () => {
            const anotherRostock = getMockCity(CityName.Rostock);

            const resultFn = () =>
                new Logic(player, [city, anotherRostock], CityName.Rostock);

            expect(resultFn).to.throw(/City names must be unique./);
        });
    });

    describe("city (getter)", () => {
        it("initially returns the startCity", () => {
            const anotherCity = getMockCity(CityName.Hamburg);
            logic = new Logic(player, [city, anotherCity], CityName.Rostock);

            const result = logic.city; // getter function

            expect(result).to.equal(city);
        });

        it("can return the selected city", () => {
            const hamburg = getMockCity(CityName.Hamburg);
            logic = new Logic(player, [city, hamburg], CityName.Rostock);

            logic.setCity(CityName.Hamburg);
            const result = logic.city; // getter function

            expect(result).to.equal(hamburg);
        });

        it("throws if selected city does not exist", () => {
            logic = new Logic(player, [city], CityName.Rostock);

            logic.setCity(CityName.Hamburg);
            const resultFn = () => logic.city; // getter function

            expect(resultFn).to.throw(/City not found Hamburg/);
        });
    });

    describe("setCity()", () => {
        it("sets the city", () => {
            const hamburg = getMockCity(CityName.Hamburg);
            logic = new Logic(player, [city, hamburg], CityName.Rostock);
            expect(logic.city.name).to.equal(CityName.Rostock);

            logic.setCity(CityName.Hamburg);

            expect(logic.city.name).to.equal(CityName.Hamburg);
        });
    });

    describe("register()", () => {
        it("with setCity() notifies observers with city-set event", () => {
            logic = new Logic(player, [city], CityName.Rostock);
            const observer: IObserver = { onLogicEvent: spy() };

            logic.register(observer);
            logic.setCity(CityName.Rostock);

            expect(observer.onLogicEvent).to.have.been.calledOnceWith({
                name: LogicEvent.CitySet,
                data: { city },
            });
        });
    });

    describe("take()", () => {
        it("checks if warehouse has enough wares of waretype", () => {
            warehouse.hasSufficientWares = stub;

            logic.take(type);

            expect(
                warehouse.hasSufficientWares
            ).to.have.been.calledOnceWithExactly(type, quantity);
        });
        it("calls player.buy() with correct params", () => {
            // we use buy as a shortcut for now. Maybe TODO #103
            player.buy = stub;

            logic.take(type);

            expect(player.buy).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                0
            );
        });
        it("calls warehouse.take() with correct params", () => {
            warehouse.take = stub;

            logic.take(type);

            expect(warehouse.take).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("does nothing on player if warehouse has not enough wares", () => {
            warehouse.hasSufficientWares = stubFalse;
            player.buy = stub;

            logic.take(type);

            expect(player.buy).to.have.not.been.called;
        });
        it("does nothing on warehouse if warehouse has not enough wares", () => {
            warehouse.hasSufficientWares = stubFalse;
            warehouse.take = stub;

            logic.take(type);

            expect(warehouse.take).to.have.not.been.called;
        });
    });

    describe("store()", () => {
        it("checks if player has enough wares of waretype", () => {
            player.isValidSell = stub;

            logic.store(type);

            expect(player.isValidSell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls player.sell() with correct params", () => {
            // we use sell as a shortcut for now. Maybe TODO #103
            player.sell = stub;

            logic.store(type);

            expect(player.sell).to.have.been.calledOnceWithExactly(
                type,
                quantity,
                0
            );
        });
        it("calls warehouse.store() with correct params", () => {
            warehouse.store = stub;

            logic.store(type);

            expect(warehouse.store).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("does nothing on player if player has not enough wares", () => {
            player.isValidSell = stubFalse;
            player.sell = stub;

            logic.store(type);

            expect(player.sell).to.have.not.been.called;
        });
        it("does nothing on warehouse if player has not enough wares", () => {
            player.isValidSell = stubFalse;
            warehouse.store = stub;

            logic.store(type);

            expect(warehouse.store).to.have.not.been.called;
        });
    });

    describe("buildFactory()", () => {
        it("increases factories of the waretype by 1", () => {
            expect(logic.city.factories.get(type)).to.equal(saltFactories);

            logic.buildFactory(type);

            expect(logic.city.factories.get(type)).to.equal(saltFactories + 1);
        });

        it("calls player.pay() with correct price", () => {
            player.pay = spy();

            logic.buildFactory(type);

            expect(player.pay).to.have.been.calledWithExactly(678);
        });

        it("does nothing if player does not have enough money", () => {
            player.hasMoney = stubFalse;
            player.pay = spy();

            logic.buildFactory(type);

            expect(player.pay).to.have.not.been.called;
        });

        it("does nothing if ware is not produced in the current city", () => {
            player.pay = spy();

            logic.buildFactory(WareType.Jewelry);

            expect(player.pay).to.have.not.been.called;
        });
    });

    describe("destroyFactory()", () => {
        it("reduces factories of the waretype by 1", () => {
            expect(logic.city.factories.get(type)).to.equal(saltFactories);

            logic.destroyFactory(type);

            expect(logic.city.factories.get(type)).to.equal(saltFactories - 1);
        });

        it("does not reduces factories if already at 0", () => {
            logic.city.factories.set(type, 0);
            expect(logic.city.factories.get(type)).to.equal(0);

            logic.destroyFactory(type);

            expect(logic.city.factories.get(type)).to.equal(0);
        });
    });
});

function getMockCity(name: CityName, warehouse?: IWarehouse): ICity {
    return {
        buy: doNothing,
        consumeAndProduce: doNothing,
        get: null as any,
        getBuyPrice: () => buyPrice,
        getSellPrice: () => sellPrice,
        hasMoney: () => true,
        isValidSell: () => true,
        name,
        sell: doNothing,
        warehouse: warehouse || getMockWarehouse(),
        factories: new Map().set(WareType.Salt, saltFactories),
        getFactory: (type: WareType) =>
            type === WareType.Salt ? saltFactories : 0,
        getBuildFactoryPrice: () => 678,
    };
}
