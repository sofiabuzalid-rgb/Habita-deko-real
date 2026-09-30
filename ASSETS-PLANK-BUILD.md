# HabitaDekoPlankBuildReel — ilusión de instalación tabla por tabla

1080×1920, 30 fps, 14s. Todo el material es el piso Habita Deko real (sin texturas genéricas ni stock).

## Elección del plano

Se revisaron los 8 videos (movimiento de cámara medido por diferencia entre fotogramas y nitidez de juntas):

| Video | Resultado |
|---|---|
| hd-03 (pasillo Arezzo, 4K) | Cámara más estable, pero en el recorte sin rótulos las juntas son tenues y solo entran 3–4 filas |
| **hd-05 (Sienna, 4K), 1.6s** | **Elegido**: tablas individuales muy legibles, juntas cortas escalonadas nítidas y cada tabla con tono propio |
| hd-01, hd-07 | Baja resolución |
| hd-02/hd-07 (muro) | El tramo estable es el muro revestido, no el piso |
| hd-04, hd-06 | Cámara con mucho movimiento |
| hd-08 | Obra en proceso (descartado) |

## Técnica

1. **Fotograma real congelado** (`public/videos-planks/plate_sienna.png`): es el primer fotograma del clip del reveal,
   así que al terminar la construcción el paso al video es exacto (sin salto).
2. **Geometría medida** (`src/plank-build/boards.ts`): juntas cortas detectadas con Canny + Hough (pendiente ≈0.24)
   y junta larga detectada; punto de fuga estimado en (881, −1454). Cuatro filas definidas por líneas que pasan por el
   punto de fuga; juntas cortas reales en las filas A (y≈705) y B (y≈1390). Las demás juntas cortas se ubicaron donde
   el tono de las tablas cambia; una vez asentadas no se notan porque el conjunto reproduce el fotograma real.
3. **Cada tabla = el fotograma recortado con su polígono** (clip-path) → conserva la veta real.
4. **Movimiento en perspectiva correcta**: deslizar una tabla a lo largo de su fila equivale a escalarla desde el
   punto de fuga; cada tabla entra desde el lado de la cámara y encaja contra la anterior (click de la junta corta).
   La primera tabla de cada fila nueva entra en ángulo desde el lado abierto (click del canto largo).
   Micro-asentamiento de 3px al encajar y sombra que desaparece al asentarse.
5. **Orden**: fila por fila de izquierda a derecha; dentro de cada fila, del fondo hacia la cámara. Una tabla por beat
   (70 BPM ≈ 0.86s). La tabla Z2 queda fuera del encuadre y no se anima.
6. **Reveal real**: `reveal_sienna-pullback.mp4` = hd-05 0.6–1.6s invertido (la cámara retrocede) a 0.3× con
   interpolación de movimiento, encuadre animado desde el recorte del piso hasta la esquina de la habitación, siempre
   fuera de los rótulos incrustados. Luego el logo original (vector del catálogo, blanco).

## Limitaciones honestas

- Las juntas largas en el video son muy tenues (compresión + luz): sus posiciones son una estimación geométrica
  coherente con el punto de fuga, no un trazado píxel a píxel.
- Durante el movimiento pueden verse brevemente hilos de subsuelo entre piezas; desaparecen al encajar.
- Solo ~8 tablas caben en el encuadre (tablas anchas en primer plano): la construcción es lenta y legible, no densa.

## Audio

Música Mixkit "Thinking About You" (70 BPM). SFX Mixkit: click de cierre al asentarse cada tabla, golpe de madera
suave en las tablas que inician fila, aire en el reveal, golpe grave muy bajo en el logo.
