import { expect } from "chai";
import { Player } from "./Player";
import { getMockWare } from "./test/getMockWare";

const DEFAULT_MONEY = 2000;

describe("Player", () => {
    let player: Player;
    let ware: ReturnType<typeof getMockWare>;

    beforeEach(() => {
        ware = getMockWare();
        player = new Player([ware]);
    });

    it("getMoney() returns the money", () => {
        const result = player.getMoney();

        expect(result).to.equal(DEFAULT_MONEY);
    });

    it("buy() reduces the money", () => {
        player.buy(ware.type, 1, 123);
        const result = player.getMoney();

        expect(result).to.equal(DEFAULT_MONEY - 123);
    });

    describe("pay()", () => {
        it("throws on price greater than player money", () => {
            const resultFn = () => player.pay(123456789);

            expect(resultFn).to.throw(/Illegal argument/);
        });

        it("works", () => {
            player.pay(10);

            expect(player.getMoney()).to.equal(DEFAULT_MONEY - 10);
        });
    });
});
