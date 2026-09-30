# HabitaDekoInstallationReel

Reel que recrea el recurso del reel de referencia (algo que toma forma delante de nosotros) con el proceso
REAL de instalación de piso SPC Habita Deko. 1080×1920, 30 fps, 17s. Sin stock ni texturas animadas.

## Estructura de la referencia (grabación de pantalla, reel de ~15.5s)

1. 0.5–3.7s: 4 franjas horizontales con artesanos trabajando, aparecen una a una (B/N → color) y se recogen.
2. 4.2–6.3s: fondo café liso (#412213) con la frase en serif, tres bloques (izquierda / centro itálico / derecha);
   a mitad, una palabra en itálica pasa a mayúsculas.
3. 6.3–7.5s: una franja horizontal se abre detrás del texto y revela el video hasta pantalla completa.
4. 7.5–11.5s: cortes del trabajo a pantalla completa con la frase fija.
5. 11.5–16s: logo que entra grande y se aleja hasta asentarse.

## Adaptación Habita Deko (70 BPM, 1 beat ≈ 0.86s: más lento y pausado que la referencia)

| Tiempo | Qué pasa |
|---|---|
| 0.2–3.3s | 4 franjas del proceso (concreto → filas → colocando → casi listo), B/N → color, se recogen |
| 3.4s | "TODO *Empieza* · *desde* · EL *Piso.*" sobre café; a 5.1s las itálicas pasan a mayúsculas |
| 6.0s | Se abre la franja y revela la obra en concreto |
| 6.0–12.9s | Progresión de la instalación, una etapa por beat, frase fija |
| 12.9s | Reveal: sala Arezzo terminada |
| 13.7s | Logo original HABITA DEKO, zoom de alejamiento suave, discreto |

## Material: solo `hd-08` muestra instalación (los demás videos son pisos terminados)

Orden por superficie cubierta (no por orden en el archivo):

| # | Archivo generado | Tramo de hd-08 | Etapa |
|---|---|---|---|
| 1 | `i1_concreto-inicio` | 9.9s | Concreto desnudo (0%) |
| 2 | `i2_pasillo-primeras-tablas` | 14.85s | Primeras tablas en el pasillo (~10%) |
| 3 | `i3_filas-junto-ventana` | 8.0s | Primeras filas escalonadas (~25%) |
| 4 | `i4_colocando-tablas` | 6.0s | Instalador colocando tablas (~40%) |
| 5 | `i5_habitacion-mitad` | 21.6s | Habitación a medio cubrir (~50%) |
| 6 | `i6_pasillo-casi-cubierto` | 16.9s | Mismo pasillo que el plano 2, casi cubierto (~70%) |
| 7 | `i7_pasillo-cubierto` | 18.2s | Continuación de la misma toma (~90%) |
| 8 | `i8_detalle-union-herramientas` | 0.6s | Detalle cenital: última unión y herramientas (~95%) |
| 9 | `i9_reveal-arezzo-terminado` | hd-04, 2.2s | Espacio terminado |

Continuidad: el pasillo aparece al inicio con las primeras tablas y vuelve casi cubierto; los planos 6→7 son una
misma toma cortada a medio beat, así el piso "crece" sin salto. Cada etapa tiene un push-in lento; tono cálido común.
hd-08 es de baja resolución (576×1024): cámara lenta con interpolación de movimiento y reescalado lanczos.
No hay en el material un primer plano de manos haciendo el click de una tabla.

## Audio

- Música: Mixkit "Thinking About You" (Arulo), 70 BPM, desde 15.87s. Mixkit Stock Music Free License.
- SFX (`public/audio-v2/`, Mixkit SFX Free License): click de cierre en los cortes de tablas, golpe de madera en
  "colocando" y en la unión, aire suave en la apertura y el reveal, golpe grave muy bajo en el logo.
