# Assets — HabitaDekoReelV2

Todo el material de V2 es nuevo: **no se reutiliza ninguno de los 5 clips de `public/videos/` (V1)**.
Todo es gratuito y de uso comercial permitido. Ningún asset requiere atribución, pero se deja registrada la fuente.

## Video (`public/videos-v2/`)

Los archivos están recortados al segmento útil, pasados a 30 fps constantes (H.264).
Los horizontales se recortaron a 3:4 (1440×1920) desde la fuente 4K cuando existía, para tener margen para pans digitales dentro del frame 9:16.

| Archivo | Fuente | Licencia | Segmento | Uso en el reel |
|---|---|---|---|---|
| `v2-01_oak-grain-macro_1440x1920.mp4` | Mixkit #34496 "Detailed tour of the surface of a wooden board" (4K) | [Mixkit Free License](https://mixkit.co/license/#videoFree) | 0–8s | Hook, fondo de EIR |
| `v2-02_sanded-oak-surface-macro_1440x1920.mp4` | Mixkit #51007 "Close-up shot of the flat surface of the trunk" (4K) | Mixkit Free License | 3.5–8.8s (evita una mancha roja en ~3s) | Hook, macro extremo de EIR |
| `v2-03_dark-walnut-grain_1440x1920.mp4` | Pexels #7830752 "Close-Up Video of a Wood" (4K) | [Pexels License](https://www.pexels.com/license/) | 0–8s | Hook, ensamble Unilin Click |
| `v2-04_floor-level-glide-light_1440x1920.mp4` | Pexels #7578546 "Video of a House Interior" (4K) | Pexels License | 0–12s | "Mucho más", "Vida real" |
| `v2-05_layered-wood-macro_1080x1920.mp4` | Mixkit #3827 "Detail view of the texture of a wooden board" (vertical) | Mixkit Free License | 0–6s | Hook |
| `v2-06_water-drop-macro_1440x1920.mp4` | Pexels #9667531 "Close-Up Shot of Water Droplets Falling Onto a Calm Water" | Pexels License | 0–5s | Fondo de "100% resistente al agua" (graduado a monocromo café) |
| `v2-07_light-beam-dark-surface_1080x1920.mp4` | Pexels #5712539 "Window Sunlight on Wall" (vertical) | Pexels License | 0–8s | Cierre con wordmark (eco de `reference-01-floor-light-beam.png`) |

Nota: los clips de madera/agua son conceptuales (estética y sensación). Las afirmaciones técnicas se presentan como
"FICHA TÉCNICA" del catálogo, no como evidencia del clip.

### Candidatos revisados y descartados
- Pexels #3773486 (interior con piso de madera): se ve anticuado / tipo inmobiliaria.
- Mixkit #3830, #3815, #34495, #34504: madera rústica/podrida/astillada, no premium.
- Pexels #11782000 (pies descalzos en deck con flores): exterior rústico.
- Coverr "Shadows on a floor" y el resto de la categoría "wood"/"hardwood-floor": bosques, carpintería, barrido de piso; nada con la estética buscada.
- Pexels #8516672 / #8516625 (sombras de hojas sobre pared crema), #10135156 (living con madera): buenos pero el piso no es protagonista.

## Audio (`public/audio-v2/`)

| Archivo | Fuente | Licencia |
|---|---|---|
| `music_deep-urban_124bpm_from-15.49s.wav` | Mixkit Music #623 "Deep Urban" — Eugenio Mininni (House, tag "fashion"), recortado desde 15.49s (downbeat donde entra el groove completo) | [Mixkit Stock Music Free License](https://mixkit.co/license/#musicFree) |
| `sfx_click-lock.mp3` | Mixkit SFX #2857 "Gear fast lock tap" | [Mixkit Sound Effects Free License](https://mixkit.co/license/#sfxFree) |
| `sfx_click-tap.mp3` | Mixkit SFX #2585 "On or off light switch tap" | Mixkit SFX Free License |
| `sfx_whoosh-small.mp3` | Mixkit SFX #166 "Fast small sweep transition" | Mixkit SFX Free License |
| `sfx_whoosh-short.mp3` | Mixkit SFX #175 "Short transition sweep" | Mixkit SFX Free License |
| `sfx_air-whoosh.mp3` | Mixkit SFX #1489 "Air woosh" | Mixkit SFX Free License |
| `sfx_bass-hit.mp3` | Mixkit SFX #2299 "Short bass hit" | Mixkit SFX Free License |
| `sfx_wood-knock.mp3` | Mixkit SFX #2182 "Wood hard hit" | Mixkit SFX Free License |
| `sfx_water-drop.mp3` | Mixkit SFX #1317 "Water bubble" | Mixkit SFX Free License |

## Acceso de red (sesión de sourcing)

- `coverr.co` / `cdn.coverr.co`: accesibles (200). La API (`api.coverr.co`) requiere API key.
- `www.pexels.com`: bloqueado por challenge de Cloudflare (`403`, `cf-mitigated: challenge`), también desde Chromium headless.
  `api.pexels.com` requiere API key. Los CDNs `videos.pexels.com` e `images.pexels.com` sí son accesibles, así que los IDs se
  encontraron vía búsqueda web y los archivos se descargaron directo del CDN.
- `pixabay.com`: `403` (Cloudflare).
- `mixkit.co` / `assets.mixkit.co`: accesibles; fuente principal de música y SFX.
