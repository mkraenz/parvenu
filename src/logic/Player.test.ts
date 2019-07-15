import { expect } from "chai";
import { Player } from "./Player";
import { getMockWare } from "./test/getMockWare";

describe("Player", () => {
    it("getMoney() returns the money", () => {
        const ware = getMockWare();
        const player = new Player([ware]);

        const result = player.getMoney();

        expect(result).to.equal(200);
    });

    it("buy() reduces the money", () => {
        const ware = getMockWare();
        const player = new Player([ware]);

        player.buy(ware.type, 1, 123);
        const result = player.getMoney();

        expect(result).to.equal(200 - 123);
    });
});
