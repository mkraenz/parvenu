import { Scene } from "phaser";
import { Color } from "../Color";
import { CityName } from "./CityName";
import { getCities } from "./data-registry/getCities";
import { getLogic } from "./data-registry/getLogic";
import { ICity } from "./ICity";
import { KEYS } from "./keys";

export class CitySelectionScene extends Scene {
    // call create() with args after adding the scene
    private cities!: ICity[];
    private logic!: {
        city: { name: string };
        setCity(cityName: CityName): void;
    };
    private clickCount = 0;

    constructor() {
        super({
            key: KEYS.scenes.citySelection,
        });
    }

    public create() {
        this.cities = getCities(this);
        this.logic = getLogic(this);

        const graphics = this.add.graphics();
        graphics.fillStyle(Color.White, 0.5);
        graphics.fillRect(800, 200, 300, 200);
        this.cities.forEach((city, i) =>
            this.add
                .text(820, 250 + i * 50, city.name)
                .setFontFamily("Arial")
                .setFontSize(32)
                .setColor(Color.Black)
        );

        this.input.addListener("pointerdown", () => {
            this.logic.setCity(
                this.cities[this.clickCount % this.cities.length].name
            );
            this.clickCount++;
        });
    }
}
