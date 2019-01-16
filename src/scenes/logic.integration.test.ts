import { expect } from "chai";
import { LogicBuilder } from "./logicBuilder";

describe("Logic integration", () => {
    it("buy() does not throw", () => {
        const logic = LogicBuilder.get();

        const resultFn = () => logic.buy();

        expect(resultFn).to.not.throw();
    });
    it("sell() does not throw", () => {
        const logic = LogicBuilder.get();

        const resultFn = () => logic.sell();

        expect(resultFn).to.not.throw();
    });
});
