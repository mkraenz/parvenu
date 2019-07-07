import { Game } from "./Game";
import { gameConfig } from "./Game.config";

main();

function main() {
    window.addEventListener("load", () => {
        // tslint:disable-next-line:no-unused-expression
        new Game(gameConfig);
    });
}
