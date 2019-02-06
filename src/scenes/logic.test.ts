// tslint:disable:no-unused-expression
// tslint:disable:no-empty

import { expect, use } from "chai";
import * as sinon from "sinon";
import sinonChai = require("sinon-chai");
import { IInventory } from "./i-inventory";
import { Logic } from "./logic";
import { WareType } from "./WareType";

use(sinonChai);

describe("Logic.", () => {
    let player: IInventory;
    let city: IInventory;
    let stub: sinon.SinonStub;

    beforeEach(() => {
        stub = sinon.stub();
        const doNothing = () => {};
        player = {
            buy: doNothing,
            isValidSell: () => true,
            sell: doNothing
        };
        city = {
            buy: doNothing,
            isValidSell: () => true,
            sell: doNothing
        };
    });

    const type = WareType.Furs;
    const quantity = 1; // Should match Logic.quantity

    describe("buy()", () => {
        it("checks if city can sell correct waretype", () => {
            city.isValidSell = stub;
            const logic = new Logic(player, city);

            logic.buy(type);

            expect(city.isValidSell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls buy() with correct waretype on player", () => {
            player.buy = stub;
            const logic = new Logic(player, city);

            logic.buy(type);

            expect(player.buy).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls sell() with correct waretype on city", () => {
            city.sell = stub;
            const logic = new Logic(player, city);

            logic.buy(type);

            expect(city.sell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("does nothing on player if city cannot sell", () => {
            city.isValidSell = stubReturningFalse();
            player.buy = stub;
            const logic = new Logic(player, city);

            logic.buy(type);

            expect(player.buy).to.have.not.been.called;
        });
        it("does nothing on city if city cannot sell", () => {
            city.isValidSell = stubReturningFalse();
            city.sell = stub;
            const logic = new Logic(player, city);

            logic.buy(type);

            expect(city.sell).to.have.not.been.called;
        });
    });

    describe("sell()", () => {
        it("checks if player can sell correct waretype", () => {
            player.isValidSell = stub;
            const logic = new Logic(player, city);

            logic.sell(type);

            expect(player.isValidSell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("calls buy() with correct waretype on city", () => {
            city.buy = stub;
            const logic = new Logic(player, city);

            logic.sell(type);

            expect(city.buy).to.have.been.calledOnceWithExactly(type, quantity);
        });
        it("calls sell() with correct waretype on player", () => {
            player.sell = stub;
            const logic = new Logic(player, city);

            logic.sell(type);

            expect(player.sell).to.have.been.calledOnceWithExactly(
                type,
                quantity
            );
        });
        it("does nothing on city if player cannot sell", () => {
            player.isValidSell = stubReturningFalse();
            city.buy = stub;
            const logic = new Logic(player, city);

            logic.sell(type);

            expect(city.buy).to.have.not.been.called;
        });
        it("does nothing on player if player cannot sell", () => {
            player.isValidSell = stubReturningFalse();
            player.sell = stub;
            const logic = new Logic(player, city);

            logic.sell(type);

            expect(player.sell).to.have.not.been.called;
        });
    });
});

function stubReturningFalse() {
    return sinon.stub().returns(false);
}
