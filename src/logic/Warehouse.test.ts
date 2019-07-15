import { expect } from "chai";
import { stub } from "sinon";
import { getMockWare } from "./City.test";
import { IWare } from "./IWare";
import { Warehouse } from "./Warehouse";

describe("Warehouse", () => {
    let ware: IWare;
    let warehouse: Warehouse;

    beforeEach(() => {
        ware = getMockWare();
        warehouse = new Warehouse([ware]);
    });

    describe("hasMoney()", () => {
        it("throws with not implemented", () => {
            const resultFn = () => warehouse.hasMoney();

            expect(resultFn).to.throw(/not implemented/);
        });
    });

    describe("hasSufficientWares()", () => {
        it("refers to buy()", () => {
            warehouse.isValidSell = stub();
            warehouse.hasSufficientWares(ware.type, 777);

            expect(warehouse.isValidSell).to.have.been.calledOnceWithExactly(
                ware.type,
                777
            );
        });
    });

    describe("store()", () => {
        it("refers to buy()", () => {
            warehouse.buy = stub();
            warehouse.store(ware.type, 777);

            expect(warehouse.buy).to.have.been.calledOnceWithExactly(
                ware.type,
                777,
                0
            );
        });
    });

    describe("take()", () => {
        it("refers to sell()", () => {
            warehouse.sell = stub();
            warehouse.take(ware.type, 777);

            expect(warehouse.sell).to.have.been.calledOnceWithExactly(
                ware.type,
                777,
                0
            );
        });
    });
});
