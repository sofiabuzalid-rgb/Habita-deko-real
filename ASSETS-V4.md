# Assets — HabitaDekoReelV4

V4 usa **exclusivamente videos reales de pisos Habita Deko instalados** (sin stock), con el lenguaje del
reel de referencia: el piso llena la pantalla, cortes al ritmo, un plano lleva al siguiente, texto solo al cierre.

## Material fuente (`source-habita-deko/`)

| Archivo | Piso | Resolución | Uso |
|---|---|---|---|
| `hd-01_464x832_60fps.mp4` | Sienna | 464×832 | Solo flashes (baja resolución) |
| `hd-02_478x850_30fps.mov` | roble claro | 478×850 | No usado: su tramo está contenido en hd-07 |
| `hd-03_2160x3840_60fps.mp4` | Arezzo | 4K | Pasillo en fuga, detalle de veta |
| `hd-04_2160x3840_60fps.mp4` | Arezzo | 4K (grabado de lado; se rota 90°) | Plano protagonista: ventanal con árboles; cierre |
| `hd-05_2160x3840_60fps.mp4` | Sienna | 4K | Habitación luminosa, luz sobre el piso, detalle |
| `hd-06_2160x3840_60fps.mp4` | Arezzo | 4K | Pasillo con boiserie hacia la ventana |
| `hd-07_478x850_30fps_15s.mp4` | roble claro (piso + muro revestido) | 478×850 | Muro revestido, esquina, barridos |
| `hd-08_1024x576_horizontal.mp4` | — | 576×1024 | No usado: obra en proceso (herramientas, obreros, concreto) |

Los videos 1, 3, 4, 5 y 6 traen rótulos incrustados ("HABITA DEKO · Piso SPC Premium" arriba y "Color Arezzo/Sienna ·
Colección Terrena" abajo). Todos los reencuadres 9:16 de V4 están elegidos para dejarlos fuera.

## Planos (`public/videos-v4/`)

Generados por reencuadre 9:16 (lanczos + unsharp suave), cámara lenta suave de las fuentes a 60 fps (0.45–0.8×)
y pan incorporado. `st` = plano de 1–2 beats, `fl` = flash de ~0.1s, `cl` = cierre.

| Plano | Fuente | Tramo | Velocidad |
|---|---|---|---|
| st01 ventanal (hero, 2 beats) | hd-04 | 2.4s | 0.6× |
| st02 luz sobre Sienna | hd-05 | 0.8s | 0.7× |
| st03 pasillo en fuga | hd-03 | 0.3s | 0.8× |
| st04 esquina / barrido | hd-07 | 6.6s | 1× |
| st05 base de boiserie | hd-06 | 1.2s | 0.7× |
| st06 reflejo de ventana | hd-04 | 2.0s | 0.7× |
| st07 luz y muro | hd-05 | 1.6s | 0.8× |
| st08 detalle de veta Arezzo | hd-03 | 1.4s | 0.8× |
| st09 muro revestido | hd-07 | 0.2s | 1× |
| st10 piso con árboles | hd-04 | 3.6s | 0.6× |
| st11 pasillo hacia la ventana | hd-06 | 2.5s | 0.7× |
| st12 tablas / barrido | hd-07 | 8.0s | 1× |
| st13 detalle de veta Sienna | hd-05 | 2.0s | 0.7× |
| st14 habitación con luz (2 beats) | hd-05 | 2.1s | 0.5× |
| cl01 ventanal (cierre) | hd-04 | 4.25s | 0.45× |
| fl01–fl16 | todas menos hd-02/hd-08 | varios | 1× |

## Edición

Misma rejilla que V3, medida del reel de referencia: 12 flashes de 0.1s → 0.17/0.20/0.23/0.23s → planos por beat
(0.50–0.53s, dos de 1.0s) → 10 flashes → cierre. 380 frames (12.67s) a 30 fps. Único texto: HABITA DEKO + LUJO A TU ALCANCE.

## Audio

Música: `public/audio-v3/music_loner_117-5bpm_from-14.31s.wav` (Mixkit "Loner", Mixkit Stock Music Free License).
SFX de `public/audio-v2/` (Mixkit SFX Free License).
