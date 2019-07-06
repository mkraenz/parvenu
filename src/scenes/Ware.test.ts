import { expect } from "chai";
import { Ware } from "./ware";
import { WareType } from "./wareType";

describe("Ware", () => {
    it("getWaresOfEachType() has correct length", () => {
        const wares = Ware.makeWaresOfEachType();
        expect(wares.length).to.equal(Object.keys(WareType).length);
    });

    it("getWaresOfEachType() has no duplicates", () => {
        const wares = Ware.makeWaresOfEachType();
        // TODO #44 this test doesn't work as Set in js compares by objectidentity
        const wareSet = new Set(wares);
        expect(wareSet.size).to.equal(wares.length);
    });
});
