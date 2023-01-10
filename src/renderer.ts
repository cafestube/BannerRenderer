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

  var wasSmooth = context.imageSmoothingEnabled;
  context.imageSmoothingEnabled = false;
  patterns.forEach((pattern) => {
    let atlasIndex =
      atlas.mapping[pattern.color][
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
  WHITE = "WHITE",
  ORANGE = "ORANGE",
  MAGENTA = "MAGENTA",
  LIGHT_BLUE = "LIGHT_BLUE",
  YELLOW = "YELLOW",
  LIME = "LIME",
  PINK = "PINK",
  GRAY = "GRAY",
  LIGHT_GRAY = "LIGHT_GRAY",
  CYAN = "CYAN",
  PURPLE = "PURPLE",
  BLUE = "BLUE",
  BROWN = "BROWN",
  GREEN = "GREEN",
  RED = "RED",
  BLACK = "BLACK",
}

export enum BannerPatternType {
  BASE = "BASE",
  BORDER = "BORDER",
  BRICKS = "BRICKS",
  CIRCLE_MIDDLE = "CIRCLE_MIDDLE",
  CREEPER = "CREEPER",
  CROSS = "CROSS",
  CURLY_BORDER = "CURLY_BORDER",
  DIAGONAL_LEFT = "DIAGONAL_LEFT",
  DIAGONAL_LEFT_MIRROR = "DIAGONAL_LEFT_MIRROR",
  DIAGONAL_RIGHT = "DIAGONAL_RIGHT",
  DIAGONAL_RIGHT_MIRROR = "DIAGONAL_RIGHT_MIRROR",
  FLOWER = "FLOWER",
  GLOBE = "GLOBE",
  GRADIENT = "GRADIENT",
  GRADIENT_UP = "GRADIENT_UP",
  HALF_HORIZONTAL = "HALF_HORIZONTAL",
  HALF_HORIZONTAL_MIRROR = "HALF_HORIZONTAL_MIRROR",
  HALF_VERTICAL = "HALF_VERTICAL",
  HALF_VERTICAL_MIRROR = "HALF_VERTICAL_MIRROR",
  MOJANG = "MOJANG",
  PIGLIN = "PIGLIN",
  RHOMBUS_MIDDLE = "RHOMBUS_MIDDLE",
  SKULL = "SKULL",
  SQUARE_BOTTOM_LEFT = "SQUARE_BOTTOM_LEFT",
  SQUARE_BOTTOM_RIGHT = "SQUARE_BOTTOM_RIGHT",
  SQUARE_TOP_LEFT = "SQUARE_TOP_LEFT",
  SQUARE_TOP_RIGHT = "SQUARE_TOP_RIGHT",
  STRAIGHT_CROSS = "STRAIGHT_CROSS",
  STRIPE_BOTTOM = "STRIPE_BOTTOM",
  STRIPE_CENTER = "STRIPE_CENTER",
  STRIPE_DOWNLEFT = "STRIPE_DOWNLEFT",
  STRIPE_DOWNRIGHT = "STRIPE_DOWNRIGHT",
  STRIPE_LEFT = "STRIPE_LEFT",
  STRIPE_MIDDLE = "STRIPE_MIDDLE",
  STRIPE_RIGHT = "STRIPE_RIGHT",
  STRIPE_SMALL = "STRIPE_SMALL",
  STRIPE_TOP = "STRIPE_TOP",
  TRIANGLE_BOTTOM = "TRIANGLE_BOTTOM",
  TRIANGLE_TOP = "TRIANGLE_TOP",
  TRIANGLES_BOTTOM = "TRIANGLES_BOTTOM",
  TRIANGLES_TOP = "TRIANGLES_TOP",
}
