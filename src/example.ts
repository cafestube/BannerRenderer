import { AtlasMapping, TextureAtlas } from "./atlas.js";
import { BannerPatternType, DyeColor, render2d } from "./renderer.js";

var canvas = <HTMLCanvasElement>document.getElementById("test");
var ctx = canvas.getContext("2d");

async function init() {
  var mapping: AtlasMapping = await fetch("/example/atlas.json").then((r) =>
    r.json()
  );

  var atlasImage = new Image();
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
