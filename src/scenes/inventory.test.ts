// tslint:disable:no-unused-expression

import { expect } from "chai";
import { Inventory } from "./inventory";

describe("Inventory.", () => {
    it("buy() increases wares by quantity", () => {
        const inventory = new Inventory(345);

        inventory.buy(100);

        expect(inventory.ware).to.equal(345 + 100);
    });
    it("sell() decreases wares by quantity", () => {
        const inventory = new Inventory(200);

        inventory.sell(50);

        expect(inventory.ware).to.equal(200 - 50);
    });
    describe("isValidSell()", () => {
        it("returns true for valid sell", () => {
            const inventory = new Inventory(200);

            const result = inventory.isValidSell(50);

            expect(result).to.be.true;
        });
        it("returns false for invalid sell", () => {
            const inventory = new Inventory(0);

            const result = inventory.isValidSell(50);

            expect(result).to.be.false;
        });
        it("returns true for remainder 0", () => {
            const inventory = new Inventory(50);

            const result = inventory.isValidSell(50);

            expect(result).to.be.true;
        });
    });
});
