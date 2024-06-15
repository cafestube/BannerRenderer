import {AtlasMapping, TextureAtlas} from "./atlas.js";
import {BannerPatternType, DyeColor, render2d} from "./renderer.js";

const canvas = <HTMLCanvasElement>document.getElementById("test");
const ctx = canvas.getContext("2d");

async function init() {
    const mapping: AtlasMapping = await fetch("/example/atlas.json").then((r) =>
        r.json()
    );

    const atlasImage = new Image();
    atlasImage.src = "/example/atlas.png";

    atlasImage.onload = function () {
        render2d(
            ctx,
            [
                {
                    color: DyeColor.RED,
                    pattern: BannerPatternType.BASE,
                },
                {
                    color: DyeColor.BLUE,
                    pattern: BannerPatternType.PIGLIN,
                },
            ],
            new TextureAtlas(atlasImage, mapping),
            0,
            0,
            canvas.width,
            canvas.height
        );
    };
}

init();
