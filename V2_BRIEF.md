# HabitaDekoReelV2 — Brief de continuación

Este documento resume todo lo acordado para V2, para retomarlo en una sesión nueva sin depender del historial de chat.

## Regla no negociable

**No modificar ni eliminar `HabitaDekoReel` (V1)** — sigue en `src/HabitaDekoReel.tsx` y sus escenas en `src/scenes/Scene*.tsx`. V2 va en una composición nueva: `HabitaDekoReelV2`, en su propio archivo/carpeta (por ejemplo `src/HabitaDekoReelV2.tsx` + `src/scenes-v2/`).

## Por qué existe V2

La V1 se sintió: genérica, tipo stock, lenta, vacía, con texto demasiado chico, más "presentación editorial" que publicidad, desconectada del producto. Los clips `clip-03` (TV con marca ajena) y `clip-04` (recogedor/escoba) ya habían sido descartados en V1 por no encajar.

**Decisión clave: NO reutilizar ninguno de los 5 clips existentes en `public/videos/`** (aunque técnicamente sirvieron para V1, visualmente no gustaron para V2). V2 necesita footage nuevo.

## Referencia visual (cómo se debe interpretar)

El usuario adjuntó un video que resultó ser una grabación de pantalla navegando Reels ajenos (cuentas `@atelier.karolina` / `@sharonhaswa_art`, pisos de mármol ajedrez/parqué/mosaico ornamentales). **Decisión explícita del usuario:** no tratar ese archivo como "anuncio de referencia" a diseccionar plano por plano (no hay un solo lenguaje de edición ahí, son varios reels distintos vistos por swipe). Usarlo **únicamente como moodboard de estética visual**: planos muy cercanos al piso, textura protagonista, composiciones interesantes, luz y sombra, sensación premium, distintas perspectivas, resultado aspiracional.

**No copiar:** cuentas, diseños de piso específicos de esos creadores, interfaz de Instagram, ni contenido protegido. Solo el "lenguaje" (macro, luz, textura, encuadres).

## Identidad de marca (ya extraída del catálogo, en `brand-reference/CATA_LOGO_TERRENA.pdf`)

- Marca: Habita Deko — pisos SPC premium, tecnología EIR.
- Sensación buscada: arquitectónica, contemporánea, cálida, táctil, sofisticada, minimalista, premium, editorial. NO ferretería, NO constructora genérica.
- Paleta: madera, café profundo, beige, crema, blanco, tonos naturales.
- Specs técnicas reales (del catálogo, no inventar nada más):
  - Espesor total 6.5mm, capa D+E
  - Formato de tabla 1800×228mm
  - Capa de desgaste 0.5mm
  - Base acústica IXPE integrada 1.5mm
  - Acabado mate natural
  - Textura EIR (Embossed in Register)
  - Sistema de ensamble Unilin Click
  - Resistencia al agua 100%
  - Colecciones: Terrena (Ravenna, Lucenna, Sienna, Arezzo)
- Wordmark HABITA DEKO: mayúsculas, geométrico, tracking amplio, importante en pantalla (no chico/perdido). No inventar isotipo nuevo. Fuente oficial no disponible → usar sans geométrica sofisticada (V1 usó Jost vía `@remotion/google-fonts`).
- Imágenes de referencia de marca: `brand-reference/reference-01-floor-light-beam.png` (piso oscuro + haz de luz + wordmark) y `brand-reference/reference-02-boxed-logo-brown.png` (wordmark en caja sobre fondo café — igual que la última página del catálogo).

## Footage a buscar (sourcing pendiente)

Prioridad absoluta: que se sienta como la referencia visual (macro, textura, luz/sombra), no "literalmente SPC flooring" en cada toma.

Buscar:
- macro de vetas y superficies de madera
- pisos/madera premium, parquet, luxury flooring
- texturas extremadamente cercanas, detalles abstractos de material
- cámara desplazándose sobre superficies (push-in, pan)
- luz y sombras arquitectónicas sobre madera
- patrones geométricos de piso
- arquitectura minimalista SOLO cuando el piso sea protagonista

Evitar: interiores genéricos de stock, Airbnb, gente caminando porque sí, inmobiliaria, construcción genérica, footage corporativo barato.

Preferir muchos fragmentos cortos (0.4–1.2s) reutilizando un buen clip con distintos timestamps/crops/zooms antes que un mismo plano largo.

**Muy importante:** los clips conceptuales de madera/textura comunican estética y sensación — las afirmaciones técnicas (100% resistente al agua, Unilin Click, EIR, base acústica) deben presentarse como información del catálogo, nunca como si el clip genérico fuera evidencia técnica del producto.

### Fuentes a intentar (en este orden, ya con Network Access habilitado para la sesión nueva)

1. Verificar primero que `pexels.com`, `api.pexels.com`, `images.pexels.com`, `videos.pexels.com` sean alcanzables (`curl -I` o similar) antes de buscar.
2. Pexels — candidatos ya identificados por búsqueda (sin descargar todavía):
   - `pexels.com/video/close-up-video-of-a-wood-7830752/`
   - `pexels.com/video/interior-design-of-a-modern-house-3773486/` (tags "Pan Shot", "Wood Flooring", "Luxury")
   - `pexels.com/video/video-of-a-house-interior-7578546/`
   - Buscar más con queries tipo: "wood texture macro", "wood grain close up", "parquet floor pan", "walnut floor light shadow".
3. Coverr (`coverr.co`) — licencia sin atribución, uso comercial libre. Categorías relevantes: `coverr.co/stock-video-footage/wood`, `coverr.co/stock-video-footage/hardwood-floor`.
4. Si ambas fallan por red, documentar el bloqueo específico (dominio + tipo de error) antes de pedir ayuda al usuario — no asumir que está bloqueado sin probar.

## Texto (mensaje mínimo, jerarquía clara)

Tipografía grande, limpia, muchísimo contraste, sans geométrica dominante. **Evitar Cormorant Garamond itálica como protagonista** (fue el error de V1 — texto chico/cursiva poco legible en celular).

Mensajes propuestos por el usuario (no es obligatorio usarlos todos, priorizar ritmo y claridad):
```
PARECE MADERA.
PERO ESTÁ HECHO PARA MUCHO MÁS.
100% RESISTENTE AL AGUA
TECNOLOGÍA EIR
UNILIN CLICK
DISEÑADO PARA LA VIDA REAL.
HABITA DEKO
LUJO A TU ALCANCE.
```

## Estructura objetivo

- Duración: ~12–15s (más corto y rítmico que V1, que era 16s).
- Formato: 1080×1920, 9:16.
- FPS: 30 o 60 (evaluar cuál reproduce mejor el ritmo una vez con footage real).
- Desde el frame 1: producto/textura/movimiento fuerte — nada de introducción lenta.
- Safe areas de Instagram Reels respetadas.
- Motion: crops animados, push-ins lentos, pans digitales, mask reveals, reveals tipográficos, tracking animation, match cuts cuando funcionen, cortes sincronizados al beat, cambios de escala sutiles. Nada de plantilla Canva/TikTok, sin glitches, sin gradientes/stickers/iconos genéricos.

## Audio (V1 no tenía, V2 sí debe tener)

- Música: minimal, fashion, architectural, premium, con beat, moderna, rítmica. NO corporate-inspirational, NO inmobiliaria, NO cinematic épico.
- Sound design discreto: clicks, impactos suaves, whooshes pequeños, textura, pasos si corresponde.
- Debe funcionar sin audio, pero ser mejor con audio.
- Sin Artlist ni bancos de pago — buscar música/SFX libres de derechos (CC0, dominio público, o librerías gratuitas tipo Pixabay Audio si el acceso de red lo permite).

## Proceso pendiente al retomar (en orden)

1. Verificar acceso de red a Pexels/Coverr desde la sesión nueva.
2. Buscar y seleccionar footage siguiendo los criterios de arriba (WebSearch + verificación visual antes de descargar todo).
3. Descargar al proyecto, organizado en una carpeta nueva (ej. `public/videos-v2/`) con nombres descriptivos.
4. Buscar y descargar música/SFX libres de derechos.
5. Construir `HabitaDekoReelV2` completo en Remotion con el branding de Habita Deko, tipografía grande, ritmo dinámico, música y sound design.
6. Renderizar una preview (mismo método que V1: Chromium headless preinstalado en `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell` + flag `--ignore-certificate-errors` para el fetch de Google Fonts) y mandarla al usuario antes de iterar más.
