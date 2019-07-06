import { IInventory } from "./i-inventory";
import { ILogic } from "./i-logic";
import { ICity } from "./ICity";
import { IPlayer } from "./IPlayer";
import { WareType } from "./wareType";

export class Logic implements ILogic {
    private tradedQuantity = 1;

    constructor(private player: IPlayer, private city: ICity) {}

    /** player buys */
    public buy(ware: WareType): void {
        const totalPrice = this.city.getBuyPrice(ware, this.tradedQuantity);
        this.trade(this.player, this.city, ware, totalPrice);
    }

    /** player sells */
    public sell(ware: WareType): void {
        const totalPrice = this.city.getSellPrice(ware, this.tradedQuantity);
        this.trade(this.city, this.player, ware, totalPrice);
    }
    public gameOver(): boolean {
        const waretypes = Object.values(WareType).map(type => type);
        for (const waretype of waretypes) {
            if (
                this.player.isValidSell(waretype, 1) ||
                this.player.hasMoney(this.city.getBuyPrice(waretype, 1))
            ) {
                return false;
            }
        }
        return true;
    }

    public randomEvent() {
        const eventNumber = Math.floor(Math.random() * 10);
        switch (eventNumber) {
            case 1: {
                this.player.setMoney(this.player.getMoney() + 500);
                break;
            }
            case 2: {
                this.player.setMoney(this.player.getMoney() - 500);
                break;
            }
            case 3: {
                this.player.setMoney(0);
                break;
            }
            case 4: {
                this.player.setMoney(this.player.getMoney() - 500);
                break;
            }
            case 5: {
                this.player.setWare(WareType.Salt, 0);
                break;
            }
            case 6: {
                this.city.setWare(WareType.Salt, 0);
                break;
            }
            case 7: {
                this.player.setWare(WareType.Juwelry, 0);
                break;
            }
            case 8: {
                this.city.setWare(WareType.Juwelry, 0);
                break;
            }
            case 9: {
                this.player.setWare(WareType.Furs, 0);
                break;
            }
            case 0: {
                this.city.setWare(WareType.Furs, 0);
                break;
            }
            default: {
                // statements;
                break;
            }
        }
    }

    private trade(
        buyer: IInventory,
        seller: IInventory,
        ware: WareType,
        totalPrice: number
    ) {
        if (
            seller.isValidSell(ware, this.tradedQuantity) &&
            buyer.hasMoney(totalPrice)
        ) {
            buyer.buy(ware, this.tradedQuantity, totalPrice);
            seller.sell(ware, this.tradedQuantity, totalPrice);
        }
    }
}
