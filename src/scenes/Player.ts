import { Inventory } from "./inventory";
import { WareType } from "./wareType";

export class Player extends Inventory {
    private money = 1000;

    public hasMoney(totalPrice: number): boolean {
        return totalPrice <= this.money;
    }
    public buy(type: WareType, quantity: number, totalPrice: number) {
        super.buy(type, quantity, totalPrice);
        this.money -= totalPrice;
        // tslint:disable-next-line:no-console
        console.log(this.money);
    }

    public sell(type: WareType, quantity: number, totalPrice: number) {
        super.sell(type, quantity, totalPrice);
        this.money += totalPrice;
        // tslint:disable-next-line:no-console
        console.log(this.money);
    }
}
