# HabitaDekoCollageReel

Reel nuevo que recrea la estructura de edición del reel de referencia (grabación de pantalla, 17.3s):
palabras sueltas sobre blanco → collage de tarjetas redondeadas que se arma y se desarma → cierre limpio.
Solo usa videos reales de pisos Habita Deko (`source-habita-deko/`). Sin stock.

## Mapa temporal medido en la referencia (t=0 = primera palabra, 1.76s de la grabación)

| Evento | Referencia | Habita Deko (130 BPM, 1 beat = 0.46s) |
|---|---|---|
| Palabras | 0.00 · 0.92 · 1.42 · 1.82 · 2.29 · 2.79 · 3.26 · 3.73 · 4.16 | Tal vez 0.00 · un 0.92 · buen espacio 1.38 · empieza 2.31 · desde el piso. 3.23 |
| Tarjetas entran | 4.63 · 5.13 · 5.60 · 6.07 · 6.54 · 6.77 · 7.04 | 4.63 · 5.07 · 5.53 · 6.00 · 6.47 · 6.70 · 6.93 |
| Collage completo | ~0.43s | ~3.2s (con los videos en movimiento) |
| Tarjetas salen (orden inverso) | 7.47 · 7.74 · 7.96 · 8.43 · 8.69 · 8.99 | 10.17 · 10.40 · 10.63 · 11.07 · 11.30 · 11.53 |
| Cierre | 9.43 título, +0.5s subtítulo, hasta 13.6 | 12.00 logo, +0.47s "Pisos SPC Premium", hasta 17.0 |

En la referencia todo entra en corte seco al ritmo de la música (~0.47s); aquí igual, con un "pop" de 3–5 frames.
La referencia alterna fondos blanco/gris/negro en las palabras; aquí, por indicación, el fondo es siempre blanco
y la variación va en el color de la tipografía (café Habita / negro). Tipografía: Poppins Bold.

Posiciones de las 7 tarjetas (1080×1920): medidas de la referencia, esquinas de 30px.

## Tarjetas (`public/videos-collage/`, 720×960, bucle ida-vuelta para que estén vivas)

| Tarjeta | Fuente | Tramo | Velocidad |
|---|---|---|---|
| card1 ventanal Arezzo | hd-04 (rotado) | 2.4–4.4s | 0.5× |
| card2 pasillo Arezzo | hd-03 | 0.2–2.2s | 0.5× |
| card3 luz sobre Sienna | hd-05 | 0.8–2.3s | 0.5× |
| card4 muro revestido | hd-07 | 0.0–1.8s | 1× |
| card5 boiserie Arezzo | hd-06 | 0.8–3.2s | 0.5× |
| card6 esquina roble claro | hd-07 | 6.4–8.8s | 1× |
| card7 reflejo Arezzo | hd-04 (rotado) | 1.8–3.4s | 0.5× |

Todos los recortes excluyen los rótulos incrustados de los videos originales.

## Marca

Logo original extraído como vector del catálogo (`public/brand/habita-deko-logo-white.svg`); para fondo blanco se usa
el mismo vector con relleno café (`habita-deko-logo-brown.svg`).

## Audio (`public/audio-collage/`)

- Música: Mixkit "Cat Walk" (Arulo), 130 BPM, desde 25.16s para que su drop coincida con la entrada del collage. Mixkit Stock Music Free License.
- SFX Mixkit (Mixkit SFX Free License): #2568 "Cool interface click tone" (palabras), #1124 "Plastic bubble click" (entra tarjeta),
  #1125 "Typewriter soft click" (sale tarjeta); golpe grave y de madera de `audio-v2/` en el logo.
