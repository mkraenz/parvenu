// tslint:disable:no-unused-expression
// tslint:disable:no-empty

import * as chai from "chai";
import * as sinon from "sinon";
import sinonChai = require("sinon-chai");
import { IInventory } from "./i-inventory";
import { MainSceneLogic } from "./mainSceneLogic";

chai.use(sinonChai);
const expect = chai.expect;

describe("MainSceneLogic.", () => {
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

    describe("buy()", () => {
        it("checks if city can sell", () => {
            city.isValidSell = stub;
            const logic = new MainSceneLogic(player, city);

            logic.buy();

            expect(city.isValidSell).to.have.been.calledOnce;
        });
        it("calls buy() on player", () => {
            player.buy = stub;
            const logic = new MainSceneLogic(player, city);

            logic.buy();

            expect(player.buy).to.have.been.calledOnce;
        });
        it("calls sell() on city", () => {
            city.sell = stub;
            const logic = new MainSceneLogic(player, city);

            logic.buy();

            expect(city.sell).to.have.been.calledOnce;
        });
        it("does nothing on player if city cannot sell", () => {
            city.isValidSell = sinon.stub().returns(false);
            player.buy = stub;
            const logic = new MainSceneLogic(player, city);

            logic.buy();

            expect(player.buy).to.have.not.been.called;
        });
        it("does nothing on city if city cannot sell", () => {
            city.isValidSell = sinon.stub().returns(false);
            city.sell = stub;
            const logic = new MainSceneLogic(player, city);

            logic.buy();

            expect(city.sell).to.have.not.been.called;
        });
    });

    describe("sell()", () => {
        it("checks if player can sell", () => {
            player.isValidSell = stub;
            const logic = new MainSceneLogic(player, city);

            logic.sell();

            expect(player.isValidSell).to.have.been.calledOnce;
        });
        it("calls buy() on city", () => {
            city.buy = stub;
            const logic = new MainSceneLogic(player, city);

            logic.sell();

            expect(city.buy).to.have.been.calledOnce;
        });
        it("calls sell() on player", () => {
            player.sell = stub;
            const logic = new MainSceneLogic(player, city);

            logic.sell();

            expect(player.sell).to.have.been.calledOnce;
        });
        it("does nothing on city if player cannot sell", () => {
            player.isValidSell = stubReturningFalse();
            city.buy = stub;
            const logic = new MainSceneLogic(player, city);

            logic.sell();

            expect(city.buy).to.have.not.been.called;
        });
        it("does nothing on player if player cannot sell", () => {
            player.isValidSell = sinon.stub().returns(false);
            player.sell = stub;
            const logic = new MainSceneLogic(player, city);

            logic.sell();

            expect(player.sell).to.have.not.been.called;
        });
    });
});

function stubReturningFalse(): (quantity: number) => boolean {
    return sinon.stub().returns(false);
}
