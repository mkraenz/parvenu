import { Scene } from "phaser";
import { Color } from "../Color";
import { getCities } from "./data-registry/getCities";
import { ICity } from "./ICity";
import { KEYS } from "./keys";

export class CitySelectionScene extends Scene {
    // call create() with args after adding the scene
    private cities!: ICity[];

    constructor() {
        super({
            key: KEYS.scenes.citySelection,
        });
    }

    public create() {
        this.cities = getCities(this);

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
    }

    // set at scene creation, else crash
    public setCities(cities: ICity[]) {
        this.cities = cities;
    }
}
