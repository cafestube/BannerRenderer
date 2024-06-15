import {BannerPatternType, DyeColor} from "./renderer";

export class TextureAtlas {
    constructor(
        public readonly image: HTMLImageElement,
        public readonly mapping: AtlasMapping
    ) {
    }
}

export type AtlasMapping = Map<DyeColor, Map<BannerPatternType, AtlasPattern>>;

export interface AtlasPattern {
    x: number;
    y: number;
    width: number;
    height: number;
}
