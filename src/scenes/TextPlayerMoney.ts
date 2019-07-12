import { GameObjects } from "phaser";
import { IPlayer } from "../logic/IPlayer";
import { setDefaultTextStyle } from "./setDefaultTextStyle";

export class TextPlayerMoney extends GameObjects.Text {
    private player!: IPlayer;

    public init(player: IPlayer) {
        this.player = player;
        setDefaultTextStyle(this);
    }

    public update() {
        this.setText(`Gold: ${this.player.getMoney()}`);
    }
}
