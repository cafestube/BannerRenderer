import java.awt.Color

private const val BIT_MASK = 0xff

enum class DyeColor(rgb: Int) {
    WHITE(0xF9FFFE),
    ORANGE(16351261),
    MAGENTA(13061821),
    LIGHT_BLUE(3847130),
    YELLOW(16701501),
    LIME(8439583),
    PINK(15961002),
    GRAY(4673362),
    LIGHT_GRAY(0x9D9D97),
    CYAN(1481884),
    PURPLE(8991416),
    BLUE(3949738),
    BROWN(8606770),
    GREEN(6192150),
    RED(11546150),
    BLACK(0x1D1D21);

    val color = Color(rgb shr 16 and BIT_MASK, rgb shr 8 and BIT_MASK, rgb shr 0 and BIT_MASK)

}