# Assets — HabitaDekoReelV3

V3 recrea el lenguaje visual del segundo video de referencia (reel de pisos): el piso ocupa todo el cuadro,
un piso lleva al siguiente, cámara en mano sobre la superficie, cortes al ritmo y texto mínimo.
No se reutiliza material de V1 ni de V2 (solo algunos SFX de `public/audio-v2/`).

## Análisis de la referencia (medido cuadro a cuadro, 60 fps)

- El reel real empieza en ~2.97s de la grabación (antes hay un reel en pausa).
- Ráfaga inicial: ~16 cortes de 0.07–0.13s, desacelerando a 0.17–0.27s.
- Tramo estable: ~10 planos de 0.50–0.53s (un plano por beat, música ≈115 BPM).
- Ráfaga final de cortes de ~0.1s y loop.
- Encuadres: cenital u oblicuo ~45°, piso 80–100% del cuadro, cámara en mano, luz natural cálida.
- Texto: un único rótulo pequeño y fijo.

V3 medido tras el render: 12 cortes de 0.10s → 0.17 / 0.20 / 0.23 / 0.23s → 16 planos de 0.50–0.53s → 9 cortes de 0.10s → cierre con wordmark. Duración total: 12.67s.

## Video (`public/videos-v3/`)

Cada archivo es un plano ya recortado a 1080×1920 (30 fps) desde la fuente, con la zona de solo piso elegida a mano
(sin personas, muebles ni objetos) y el pan de cámara incluido. `st` = plano sostenido de 1 beat, `fl` = flash de ráfaga,
`cl` = cierre. Todas las fuentes son de Pexels (descargadas del CDN `videos.pexels.com`), [Pexels License](https://www.pexels.com/license/): uso comercial gratuito, sin atribución obligatoria.

| ID Pexels | Resolución fuente | Planos que salen de ahí |
|---|---|---|
| 5644671 (interior con espiga y sol) | 1280×720 | st01, st10, fl09, cl01 |
| 5644695 (espiga, cámara deslizándose) | 1920×1080 | st04, st14, st16 |
| 5644706 (espiga, sillón) | 1920×1080 | fl03 |
| 5644698 (espiga, sofá) | 1920×1080 | fl04 |
| 10637339 (parquet en rombos con luz) | 4096×2160 | st02, st12, fl07 |
| 8566376 (laminado claro a ras de piso) | 3840×2160 | st03 |
| 6857116 (chevron de roble claro) | 4096×2160 | st05, fl10 |
| 9465900 (espiga cálida) | 3840×2160 | st06, fl11 |
| 8566386 (macro de tabla clara) | 3840×2160 | st07, fl12 |
| 7166866 (espiga oscura cálida) | 4096×2160 | st08, fl08 |
| 35143877 (tablones de biblioteca, caminando) | 1440×2560 | st09, fl13 |
| 6864992 (espiga miel) | 4096×2160 | st11, fl14 |
| 6844214 (parquet de salón) | 4096×2160 | st13 |
| 9218143 (piso oscuro con haz de sol) | 1920×1080 | st15, fl02 |
| 6959752 (parquet cenital) | 1920×1080 | fl01 |
| 9218114 (tablones oscuros) | 1920×1080 | fl05 |
| 6763099 (espiga oscura cenital) | 3840×2160 | fl06 |

Los recortes de fuentes HD/720p se reescalaron con lanczos y un unsharp suave; los más reescalados se usan
solo como flashes de 0.1s, donde la diferencia no se percibe (igual que en la referencia, que es grabación de celular).

### Sourcing: cómo se hizo

- `www.pexels.com` bloquea `curl`/Chromium con challenge de Cloudflare, pero WebFetch sí lee las páginas de búsqueda:
  se usaron ~25 búsquedas (herringbone, parquet, chevron, hardwood/oak/wood floor, floor top view, laminate, palace/museum/ballroom,
  sunlight on floor, empty apartment, dance studio floor, etc.) y se exploraron IDs vecinos de las series buenas.
- ~130 candidatos revisados por miniatura; 51 descargados y revisados con 5 fotogramas + medición de movimiento;
  los finalistas con tiras de fotogramas cada 1.5–2s y cuadrícula para elegir tramos y recortes.
- Criterio: "¿este plano podría pertenecer a ese reel si fuera de Habita Deko?".
- Mixkit y Coverr se revisaron de nuevo (parquet, herringbone, hardwood, wooden floor, hallway, etc.): casi nada con el piso protagonista.
- Descartados: pisos de mármol/damero (los de la referencia, por indicación), escenas donde el piso no se puede aislar
  (personas, mascotas, robots en todo el cuadro), exteriores rústicos, interiores tipo inmobiliaria.

## Audio (`public/audio-v3/`)

| Archivo | Fuente | Licencia |
|---|---|---|
| `music_loner_117-5bpm_from-14.31s.wav` | Mixkit Music #199 "Loner" — Arulo (House), 117.51 BPM, recortado desde 14.31s (un compás antes del groove completo) | [Mixkit Stock Music Free License](https://mixkit.co/license/#musicFree) |

Elegida por tempo (117.5 vs ~115 BPM de la referencia) y timbre grave y cálido (centroide espectral ~800 Hz vs ~600 Hz de la referencia).
SFX reutilizados de `public/audio-v2/` (Mixkit SFX Free License): tic suave en cada flash, whoosh de entrada, bass en el drop, golpe de madera y bass en el wordmark.
