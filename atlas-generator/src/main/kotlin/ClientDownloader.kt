import com.google.gson.JsonParser
import java.io.BufferedInputStream
import java.io.FileOutputStream
import java.net.URI
import java.net.URL
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.nio.file.Files
import java.nio.file.Path
import java.util.zip.ZipFile


fun downloadAndExtractPatterns(destination: Path, patterns: List<BannerPattern>) {
    val tmp = Files.createTempDirectory("atlas-generator")
    println("Fetching Minecraft Versions")
    val clientUrl = fetchNewestMinecraftClient()
    val client = tmp.resolve("client")
    println("Downloading Minecraft client")
    downloadClientToFile(clientUrl, client)
    println("Extracting Patterns")

    ZipFile(client.toFile()).use {
        patterns.forEach { pattern ->
            val entry = it.getEntry("assets/minecraft/textures/entity/banner/${pattern.fileName}")
                ?: throw IllegalStateException("Missing banner pattern ${pattern.fileName}")

            val image = it.getInputStream(entry).readAllBytes()
            FileOutputStream(destination.resolve(pattern.fileName).toFile()).use {
                it.write(image)
            }
            println("Extracted ${pattern.fileName}")
        }
    }
}

private fun downloadClientToFile(clientUrl: String, client: Path) {
    BufferedInputStream(URL(clientUrl).openStream()).use { input ->
        FileOutputStream(client.toFile()).use { fileOutputStream ->
            val dataBuffer = ByteArray(1024)
            var bytesRead: Int
            while (input.read(dataBuffer, 0, 1024).also { bytesRead = it } != -1) {
                fileOutputStream.write(dataBuffer, 0, bytesRead)
            }
        }
    }
}

private fun fetchNewestMinecraftClient(): String {
    val client = HttpClient.newHttpClient()
    val response = client.send(
        HttpRequest.newBuilder().GET()
            .uri(URI("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json")).build(),

        HttpResponse.BodyHandlers.ofString()
    )
    val json = JsonParser.parseString(response.body()).asJsonObject
    val latest = json.get("latest").asJsonObject.get("release").asString

    val versions = json.get("versions").asJsonArray
    val version = versions.first { it.asJsonObject.get("id").asString == latest }.asJsonObject
    val url = version.get("url").asString

    val clientMetaResponse = client.send(
        HttpRequest.newBuilder().GET()
            .uri(URI(url)).build(), HttpResponse.BodyHandlers.ofString()
    )
    val clientMeta = JsonParser.parseString(clientMetaResponse.body()).asJsonObject
    val download = clientMeta.get("downloads").asJsonObject.get("client").asJsonObject.get("url").asString!!
    println("Found download for $latest")
    return download
}
