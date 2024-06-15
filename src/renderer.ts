import {TextureAtlas} from "./atlas";

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

    const wasSmooth = context.imageSmoothingEnabled;
    context.imageSmoothingEnabled = false;
    patterns.forEach((pattern) => {
        let atlasIndex = atlas.mapping[pattern.color][pattern.pattern];

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
        public readonly pattern: string,
        public readonly color: DyeColor
    ) {
    }
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
    BASE = "minecraft:base",
    SQUARE_BOTTOM_LEFT = "minecraft:square_bottom_left",
    SQUARE_BOTTOM_RIGHT = "minecraft:square_bottom_right",
    SQUARE_TOP_LEFT = "minecraft:square_top_left",
    SQUARE_TOP_RIGHT = "minecraft:square_top_right",
    STRIPE_BOTTOM = "minecraft:stripe_bottom",
    STRIPE_TOP = "minecraft:stripe_top",
    STRIPE_LEFT = "minecraft:stripe_left",
    STRIPE_RIGHT = "minecraft:stripe_right",
    STRIPE_CENTER = "minecraft:stripe_center",
    STRIPE_MIDDLE = "minecraft:stripe_middle",
    STRIPE_DOWNRIGHT = "minecraft:stripe_downright",
    STRIPE_DOWNLEFT = "minecraft:stripe_downleft",
    SMALL_STRIPES = "minecraft:small_stripes",
    CROSS = "minecraft:cross",
    STRAIGHT_CROSS = "minecraft:straight_cross",
    TRIANGLE_BOTTOM = "minecraft:triangle_bottom",
    TRIANGLE_TOP = "minecraft:triangle_top",
    TRIANGLES_BOTTOM = "minecraft:triangles_bottom",
    TRIANGLES_TOP = "minecraft:triangles_top",
    DIAGONAL_LEFT = "minecraft:diagonal_left",
    DIAGONAL_UP_RIGHT = "minecraft:diagonal_up_right",
    DIAGONAL_UP_LEFT = "minecraft:diagonal_up_left",
    DIAGONAL_RIGHT = "minecraft:diagonal_right",
    CIRCLE = "minecraft:circle",
    RHOMBUS = "minecraft:rhombus",
    HALF_VERTICAL = "minecraft:half_vertical",
    HALF_HORIZONTAL = "minecraft:half_horizontal",
    HALF_VERTICAL_RIGHT = "minecraft:half_vertical_right",
    HALF_HORIZONTAL_BOTTOM = "minecraft:half_horizontal_bottom",
    BORDER = "minecraft:border",
    CURLY_BORDER = "minecraft:curly_border",
    CREEPER = "minecraft:creeper",
    GRADIENT = "minecraft:gradient",
    GRADIENT_UP = "minecraft:gradient_up",
    BRICKS = "minecraft:bricks",
    SKULL = "minecraft:skull",
    FLOWER = "minecraft:flower",
    MOJANG = "minecraft:mojang",
    GLOBE = "minecraft:globe",
    PIGLIN = "minecraft:piglin",
    FLOW = "minecraft:flow",
    GUSTER = "minecraft:guster",
}
