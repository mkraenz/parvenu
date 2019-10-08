import { Inventory } from "./Inventory";
import { IPlayer } from "./IPlayer";
import { WareType } from "./WareType";

export class Player extends Inventory implements IPlayer {
    private money = 2000;

    public hasMoney(totalPrice: number): boolean {
        return totalPrice <= this.money;
    }

    public getMoney(): number {
        return this.money;
    }

    public buy(type: WareType, quantity: number, totalPrice: number) {
        super.buy(type, quantity, totalPrice);
        this.money -= totalPrice;
    }

    public sell(type: WareType, quantity: number, totalPrice: number) {
        super.sell(type, quantity, totalPrice);
        this.money += totalPrice;
    }

    public pay(price: number) {
        if (this.money < price) {
            throw new Error(
                "Illegal argument, provided price must be strictly smaller than player money"
            );
        }
        this.money -= price;
    }
}
