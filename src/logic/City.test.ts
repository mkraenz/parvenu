// tslint:disable:no-unused-expression
import { expect, use } from "chai";
import { stubTrue } from "lodash";
import { spy } from "sinon";
import * as sinonChai from "sinon-chai";
import { City } from "./City";
import { cityConfig } from "./City.config";
import { CityName } from "./CityName";
import { doNothing } from "./doNothing";
import { IWareForCity } from "./IWareForCity";
import { IWarehouse } from "./IWarehouse";
import { WareType } from "./WareType";

use(sinonChai);

describe("City", () => {
    let ware: IWareForCity;
    let city: City;
    let warehouse: IWarehouse;

    beforeEach(() => {
        ware = getMockWare();
        warehouse = getMockWarehouse();
        city = new City([ware], CityName.Mecklenburg, warehouse);
    });

    describe("getSellPrice()", () => {
        const toSellPrice = (price: number) =>
            Math.round(price * cityConfig.sellToBuyPriceFactor);

        it("returns maxPrice * sellToBuyPriceFactor when city quantity 0", () => {
            const result = city.getSellPrice(WareType.Furs, 1);

            const expected = toSellPrice(355);
            expect(result).to.equal(expected);
        });

        it("returns maxPrice * sellToBuyPriceFactor when city quantity 1", () => {
            ware.getQuantity = () => 1;

            const result = city.getSellPrice(WareType.Furs, 1);

            expect(result).to.equal(toSellPrice(355));
        });

        it("returns minPrice * sellToBuyPriceFactor when city quantity very large", () => {
            ware.getQuantity = () => 999999999;

            const result = city.getSellPrice(WareType.Furs, 1);

            expect(result).to.equal(toSellPrice(130));
        });
    });

    describe("getBuyPrice()", () => {
        it("returns maxPrice when city quantity 0", () => {
            const result = city.getBuyPrice(WareType.Furs, 1);

            const expected = 355;
            expect(result).to.equal(expected);
        });

        it("returns maxPrice when city quantity 1", () => {
            ware.getQuantity = () => 1;

            const result = city.getBuyPrice(WareType.Furs, 1);

            expect(result).to.equal(355);
        });

        it("returns minPrice when city quantity very large", () => {
            ware.getQuantity = () => 99999999;

            const result = city.getBuyPrice(WareType.Furs, 1);

            expect(result).to.equal(130);
        });
    });

    describe("consumeOrProduce()", () => {
        it("consuming city does not reduce quantity when quantity = 0", () => {
            ware.add = spy();

            // test city Mecklenburg consumes Furs
            city.consumeAndProduce();

            expect(ware.add).to.have.not.been.called;
        });

        it("consuming city reduces ware quantity by 1 when quantity >= 1", () => {
            ware.getQuantity = () => 1;
            ware.add = spy();

            // test city Mecklenburg consumes Furs
            city.consumeAndProduce();

            expect(ware.add).to.have.been.calledWithExactly(-1);
        });

        it("producing city increases ware quantity by 1", () => {
            const producerCity = new City([ware], CityName.Holstein, warehouse);
            ware.add = spy();

            // Holstein produces Furs
            producerCity.consumeAndProduce();

            expect(ware.add).to.have.been.calledWithExactly(1);
        });
    });
});

export const getMockWare = () => ({
    add: doNothing,
    getQuantity: () => 0,
    getQuantity$: undefined as any,
    maxPrice: 355,
    minPrice: 130,
    type: WareType.Furs,
});

export const getMockWarehouse = (): IWarehouse => ({
    get: () => getMockWare(),
    hasSufficientWares: stubTrue,
    store: doNothing,
    take: doNothing,
});
