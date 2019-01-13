export interface IInventory {
    isValidSell(quantity: number): boolean;
    buy(quantity: number): void;
    sell(quantity: number): void;
}
