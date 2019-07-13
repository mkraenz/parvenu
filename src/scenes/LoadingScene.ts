import { Scene } from "phaser";
import { Color, toHex } from "../Color";
import { KEYS } from "./keys";
import { setDefaultTextStyle } from "./setDefaultTextStyle";

export class LoadingScene extends Scene {
    private halfWidth!: number;
    private halfHeight!: number;

    constructor() {
        super({
            key: KEYS.scenes.loading,
        });
    }

    public preload() {
        this.halfWidth = this.scale.width / 2;
        this.halfHeight = this.scale.height / 2;

        this.preloadAllAssets();
        this.addTitles();
        this.makeLoadingBar();
    }

    private makeLoadingBar() {
        const loadingText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight - 50,
            text: "Loading...",
            style: {
                font: "30px Arial",
                fill: Color.White,
            },
        });
        loadingText.setOrigin(0.5);

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(toHex(Color.DarkGrey), 0.8);
        progressBox.fillRect(
            this.halfWidth - 320 / 2,
            this.halfHeight,
            320,
            50
        );

        const assetText = this.make.text({
            x: this.halfWidth,
            y: this.halfHeight + 65,
            text: "",
            style: {
                font: "18px Arial",
                fill: Color.White,
            },
        });
        assetText.setOrigin(0.5);

        this.load.on("progress", this.getProgressBarFiller(progressBar));
        this.load.on("fileprogress", this.getAssetTextWriter(assetText));
        this.load.on(
            "complete",
            this.destroyAndStartMainScene(
                progressBar,
                progressBox,
                loadingText,
                assetText
            )
        );
    }

    private destroyAndStartMainScene(
        progressBar: Phaser.GameObjects.Graphics,
        progressBox: Phaser.GameObjects.Graphics,
        loadingText: Phaser.GameObjects.Text,
        assetText: Phaser.GameObjects.Text
    ): () => void {
        return () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            assetText.destroy();
            this.scene.start(KEYS.scenes.main);
        };
    }

    private getAssetTextWriter(
        assetText: Phaser.GameObjects.Text
    ): (file: { key: string }) => void {
        return (file: { key: string }) => {
            assetText.setText(`Loading asset: ${file.key}`);
        };
    }

    private getProgressBarFiller(
        progressBar: Phaser.GameObjects.Graphics
    ): (count: number) => void {
        return (count: number) => {
            progressBar.clear();
            progressBar.fillStyle(toHex(Color.White));
            progressBar.fillRect(
                this.halfWidth + 10 - 320 / 2,
                this.halfHeight + 10,
                300 * count,
                30
            );
        };
    }

    private preloadAllAssets() {
        Object.values(KEYS.images).forEach(image =>
            this.load.image(image.key, image.path)
        );
        Object.values(KEYS.sound).forEach(sound =>
            this.load.audio(sound.key, sound.path)
        );
    }

    private addTitles() {
        const title = this.add
            .text(this.halfWidth, this.halfHeight - 200, "Parvenu")
            .setOrigin(0.5);
        setDefaultTextStyle(title);
        title.setFontSize(112);
        title.setColor(Color.White);

        const subtitle = this.add
            .text(
                this.halfWidth,
                this.halfHeight - 120,
                "Build, Trade, Automate"
            )
            .setOrigin(0.5);
        setDefaultTextStyle(subtitle);
        subtitle.setColor(Color.White);
    }
}
