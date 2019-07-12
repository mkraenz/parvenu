import { Scene } from "phaser";
import { Color } from "../Color";
import { CityName } from "../logic/CityName";
import { ICity } from "../logic/ICity";
import { getCities } from "./data-registry/getCities";
import { getLogic } from "./data-registry/getLogic";
import { KEYS } from "./keys";
import { setDefaultTextStyle } from "./setDefaultTextStyle";

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

        this.addBackground();
        this.cities.forEach((city, i) => {
            const text = this.add.text(850, 250 + i * 50, city.name);
            setDefaultTextStyle(text);
        });
        const selectedMarker = this.add
            .graphics()
            .fillStyle(Color.BlackAsNumber)
            .fillCircle(820, 265, 10);

        this.input.addListener("pointerdown", () => {
            const index = this.clickCount % this.cities.length;
            this.logic.setCity(this.cities[index].name);
            // for some reason, the new y is relative to the y position provided on construction
            selectedMarker.setY(index * 50);
            this.clickCount++;
        });
    }

    private addBackground() {
        this.add
            .image(750, 200, KEYS.images.parchment.key)
            .setOrigin(0)
            .setScale(0.6, 0.25 * this.cities.length)
            .setAlpha(0.7);
    }
}
