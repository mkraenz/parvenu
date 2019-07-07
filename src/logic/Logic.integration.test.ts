import { expect } from "chai";
import { LogicBuilder } from "./LogicBuilder";
import { WareType } from "./WareType";

describe("Logic integration", () => {
    it("buy() does not throw", () => {
        const logic = LogicBuilder.create().logic;

        const resultFn = () => logic.buy(WareType.Furs);

        expect(resultFn).to.not.throw();
    });

    it("sell() does not throw", () => {
        const logic = LogicBuilder.create().logic;

        const resultFn = () => logic.sell(WareType.Furs);

        expect(resultFn).to.not.throw();
    });
});
