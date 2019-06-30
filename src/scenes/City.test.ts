import { expect } from "chai";
import { City } from "./City";
import { cityConfig } from "./City.config";
import { WareType } from "./wareType";

describe("City", () => {
    describe("getSellPrice()", () => {
        const toSellPrice = (price: number) =>
            Math.round(price * cityConfig.sellToBuyPriceFactor);

        it("returns maxPrice * sellToBuyPriceFactor when city quantity 0", () => {
            const city = new City([
                {
                    add: () => undefined,
                    getQuantity: () => 0,
                    getStream: undefined as any,
                    maxPrice: 355,
                    minPrice: 130,
                    price: 123,
                    type: WareType.Furs
                }
            ]);

            const result = city.getSellPrice(WareType.Furs, 1);

            const expected = toSellPrice(355);
            expect(result).to.equal(expected);
        });

        it("returns maxPrice * sellToBuyPriceFactor when city quantity 1", () => {
            const city = new City([
                {
                    add: () => undefined,
                    getQuantity: () => 1,
                    getStream: undefined as any,
                    maxPrice: 355,
                    minPrice: 130,
                    price: 123,
                    type: WareType.Furs
                }
            ]);

            const result = city.getSellPrice(WareType.Furs, 1);

            expect(result).to.equal(toSellPrice(355));
        });

        it("returns minPrice * sellToBuyPriceFactor when city quantity very large", () => {
            const city = new City([
                {
                    add: () => undefined,
                    getQuantity: () => 99999999,
                    getStream: undefined as any,
                    maxPrice: 355,
                    minPrice: 130,
                    price: 123,
                    type: WareType.Furs
                }
            ]);

            const result = city.getSellPrice(WareType.Furs, 1);

            expect(result).to.equal(toSellPrice(130));
        });
    });

    describe("getBuyPrice()", () => {
        it("returns maxPrice when city quantity 0", () => {
            const city = new City([
                {
                    add: () => undefined,
                    getQuantity: () => 0,
                    getStream: undefined as any,
                    maxPrice: 355,
                    minPrice: 130,
                    price: 123,
                    type: WareType.Furs
                }
            ]);

            const result = city.getBuyPrice(WareType.Furs, 1);

            const expected = 355;
            expect(result).to.equal(expected);
        });

        it("returns maxPrice when city quantity 1", () => {
            const city = new City([
                {
                    add: () => undefined,
                    getQuantity: () => 1,
                    getStream: undefined as any,
                    maxPrice: 355,
                    minPrice: 130,
                    price: 123,
                    type: WareType.Furs
                }
            ]);

            const result = city.getBuyPrice(WareType.Furs, 1);

            expect(result).to.equal(355);
        });

        it("returns minPrice when city quantity very large", () => {
            const city = new City([
                {
                    add: () => undefined,
                    getQuantity: () => 99999999,
                    getStream: undefined as any,
                    maxPrice: 355,
                    minPrice: 130,
                    price: 123,
                    type: WareType.Furs
                }
            ]);

            const result = city.getBuyPrice(WareType.Furs, 1);

            expect(result).to.equal(130);
        });
    });
});
