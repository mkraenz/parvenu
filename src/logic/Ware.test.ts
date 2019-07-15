import { expect } from "chai";
import { uniq } from "lodash";
import { Subject } from "rxjs";
import { Ware } from "./Ware";
import { WareType } from "./WareType";

describe("Ware", () => {
    it("getWaresOfEachType() has correct length", () => {
        const wares = Ware.makeWaresOfEachType();

        expect(wares.length).to.equal(Object.keys(WareType).length);
    });

    it("getWaresOfEachType() has no duplicates", () => {
        const wares = Ware.makeWaresOfEachType();

        const uniqWareTypes = uniq(wares.map(ware => ware.type));

        expect(uniqWareTypes.length).to.equal(wares.length);
    });

    it("getStream()", () => {
        const ware = new Ware(WareType.Furs, 123);

        const result = ware.getStream();

        expect(result).to.be.instanceOf(Subject);
    });
});
