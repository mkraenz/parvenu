import { expect } from "chai";
import { Inventory } from "./inventory";

describe("Inventory", () => {
    it("buy() increases wares by quantity", () => {
        // Arrange
        const inventory = new Inventory();
        const quantity = 123;

        // act
        inventory.buy(quantity);

        // assert
        expect(inventory.ware - inventory.startQuantity).to.equal(quantity);
    });
});
