import com.google.gson.JsonArray
import com.google.gson.JsonObject
import java.awt.Color
import java.awt.image.BufferedImage
import java.nio.file.Files
import java.nio.file.Path
import javax.imageio.ImageIO
import kotlin.math.max
import kotlin.math.min

fun main() {
    val path = Path.of("patterns")
    if(!Files.exists(path))
        Files.createDirectories(path)

    val needsDownload = BannerPattern.values().filter { !Files.exists(path.resolve(it.fileName)) }
    if(needsDownload.isNotEmpty()) {
        println("Downloading ${needsDownload.size} patterns")
        downloadAndExtractPatterns(path, needsDownload)
    }

    val textureWidth = 64
    val textureHeight = 64

    println(BannerPattern.values().size)
    val atlasWidth = textureWidth * BannerPattern.values().size
    val atlasHeight = textureHeight * DyeColor.values().size

    val bufferedImage = BufferedImage(atlasWidth, atlasHeight, BufferedImage.TYPE_INT_ARGB)
    val graphics = bufferedImage.createGraphics()

    var xOffset = 0
    var yOffset = 0


    val atlasData = JsonObject()


    DyeColor.values().forEach { color ->
        val patterns = JsonObject()

        BannerPattern.values().forEach { pattern ->

            var image = ImageIO.read(Files.newInputStream(path.resolve(pattern.fileName)))

            if(color != DyeColor.WHITE) {
                image = tint(image, color.color)
            }
            graphics.drawImage(image, xOffset, yOffset, null)

            patterns.add(pattern.name, JsonObject().apply {
                addProperty("x", xOffset)
                addProperty("y", yOffset)
                //addProperty("width", textureWidth)
                //addProperty("height", textureHeight)
            })

            xOffset+=textureWidth
        }

        atlasData.add(color.name, patterns)

        xOffset = 0
        yOffset+=textureHeight
    }

    Files.newOutputStream(Path.of("atlas.json")).use {
        it.write(atlasData.toString().toByteArray())
    }
    ImageIO.write(bufferedImage, "png", Files.newOutputStream(Path.of("atlas.png")))
}

fun tint(input: BufferedImage, color: Color): BufferedImage {
    val image = BufferedImage(input.width, input.height, BufferedImage.TYPE_INT_ARGB)

    for (x in 0 until image.width) {
        for (y in 0 until image.height) {
            val pixelColor = Color(input.getRGB(x, y), true)


            val r = min(((pixelColor.red.toFloat() / 255f) * (color.red.toFloat() / 255f)), 1.0f)
            val g = min(((pixelColor.green.toFloat() / 255f) * (color.green.toFloat() / 255f)), 1.0f)
            val b = min(((pixelColor.blue.toFloat() / 255f) * (color.blue.toFloat() / 255f)), 1.0f)
            val a = pixelColor.alpha

            image.setRGB(x, y, Color(r, g, b, a.toFloat() / 255f).rgb)
        }
    }
    return image
}