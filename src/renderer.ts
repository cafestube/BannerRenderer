import { TextureAtlas } from "./atlas";

export function render2d(
  context: CanvasRenderingContext2D,
  patterns: BannerPattern[],
  atlas: TextureAtlas,
  x: number,
  y: number,
  width: number,
  height: number
) {
  if (patterns.length == 0 || patterns[0].pattern != BannerPatternType.BASE) {
    throw Error("No base pattern found");
  }

  console.log(atlas);

  var wasSmooth = context.imageSmoothingEnabled;
  context.imageSmoothingEnabled = false;
  patterns.forEach((pattern) => {
    let atlasIndex =
      atlas.mapping[DyeColor[pattern.color].toString()][
        BannerPatternType[pattern.pattern].toString()
      ];

    context.drawImage(
      atlas.image,
      atlasIndex.x + 1,
      atlasIndex.y + 1,
      20, //The image is 64x64, but we only want the front
      40, //The image is 64x64, but we only want the front
      x,
      y,
      width,
      height
    );
  });

  context.imageSmoothingEnabled = wasSmooth;
}

export class BannerPattern {
  constructor(
    public readonly pattern: BannerPatternType,
    public readonly color: DyeColor
  ) {}
}

export enum DyeColor {
  WHITE,
  ORANGE,
  MAGENTA,
  LIGHT_BLUE,
  YELLOW,
  LIME,
  PINK,
  GRAY,
  LIGHT_GRAY,
  CYAN,
  PURPLE,
  BLUE,
  BROWN,
  GREEN,
  RED,
  BLACK,
}

export enum BannerPatternType {
  BASE,
  BORDER,
  BRICKS,
  CIRCLE_MIDDLE,
  CREEPER,
  CROSS,
  CURLY_BORDER,
  DIAGONAL_LEFT,
  DIAGONAL_LEFT_MIRROR,
  DIAGONAL_RIGHT,
  DIAGONAL_RIGHT_MIRROR,
  FLOWER,
  GLOBE,
  GRADIENT,
  GRADIENT_UP,
  HALF_HORIZONTAL,
  HALF_HORIZONTAL_MIRROR,
  HALF_VERTICAL,
  HALF_VERTICAL_MIRROR,
  MOJANG,
  PIGLIN,
  RHOMBUS_MIDDLE,
  SKULL,
  SQUARE_BOTTOM_LEFT,
  SQUARE_BOTTOM_RIGHT,
  SQUARE_TOP_LEFT,
  SQUARE_TOP_RIGHT,
  STRAIGHT_CROSS,
  STRIPE_BOTTOM,
  STRIPE_CENTER,
  STRIPE_DOWNLEFT,
  STRIPE_DOWNRIGHT,
  STRIPE_LEFT,
  STRIPE_MIDDLE,
  STRIPE_RIGHT,
  STRIPE_SMALL,
  STRIPE_TOP,
  TRIANGLE_BOTTOM,
  TRIANGLE_TOP,
  TRIANGLES_BOTTOM,
  TRIANGLES_TOP,
}
