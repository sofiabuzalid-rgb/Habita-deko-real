// HabitaDekoInstallationReel — mapa temporal adaptado del reel de referencia:
// 1) franjas horizontales del proceso que aparecen una a una (B/N → color) y se recogen,
// 2) fondo café liso con la frase en tres bloques,
// 3) una franja horizontal se abre detrás del texto y revela el video,
// 4) progresión de la instalación a pantalla completa con la frase fija (un beat por etapa),
// 5) reveal del espacio terminado y logo con zoom de alejamiento.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Música: "Thinking About You" (Mixkit), 70 BPM → 1 beat ≈ 0.86s (ritmo lento y pausado).
export const BPM = 70;
export const FRAMES_PER_BEAT = (FPS * 60) / BPM; // ≈ 25.7
export const beat = (n: number) => Math.round(n * FRAMES_PER_BEAT);

export const DURATION_IN_FRAMES = 510; // 17s

export const BG = "#412213"; // café medido en la referencia
export const CREAM = "#F4EDE3";

const v = (name: string) => `videos-installation/${name}.mp4`;

// 1) Franjas: de arriba hacia abajo, el proceso en orden (concreto → filas → colocando → casi listo).
export const STRIPS = [
  v("i1_concreto-inicio"),
  v("i3_filas-junto-ventana"),
  v("i4_colocando-tablas"),
  v("i8_detalle-union-herramientas"),
];
export const STRIP_FIRST = 6;
export const STRIP_STEP = 7; // ~0.25s entre franjas, como en la referencia
export const STRIP_COLOR_AT = 45; // pasan de B/N a color
export const STRIP_OUT_FROM = 70; // se recogen hacia la izquierda, escalonadas
export const STRIPS_END = 100;

// 2) Frase.
export const TEXT_IN = beat(4);
export const TEXT_MORPH = beat(6); // itálica → mayúsculas, como "Beautiful" → "BEAUTIFUL"

// 3) Franja que se abre y revela el video.
export const BAND_FROM = beat(7);
export const BAND_HOLD = BAND_FROM + 14;
export const BAND_FULL = BAND_FROM + 38;

// 4) Progresión: de menos piso instalado a más. Un beat por etapa; las etapas 6 y 7 son la misma
// toma continua del pasillo (medio beat cada una) para que el piso "crezca" sin salto.
export type Stage = { src: string; from: number; to: number; offsetSec?: number };
export const STAGES: Stage[] = [
  { src: v("i1_concreto-inicio"), from: BAND_FROM, to: beat(9), offsetSec: 1.2 },
  { src: v("i2_pasillo-primeras-tablas"), from: beat(9), to: beat(10) },
  { src: v("i3_filas-junto-ventana"), from: beat(10), to: beat(11) },
  { src: v("i4_colocando-tablas"), from: beat(11), to: beat(12), offsetSec: 0.8 },
  { src: v("i5_habitacion-mitad"), from: beat(12), to: beat(13) },
  { src: v("i6_pasillo-casi-cubierto"), from: beat(13), to: beat(13.5) },
  { src: v("i7_pasillo-cubierto"), from: beat(13.5), to: beat(14) },
  { src: v("i8_detalle-union-herramientas"), from: beat(14), to: beat(15) },
];

// 5) Reveal final + logo.
export const REVEAL_FROM = beat(15);
export const REVEAL_SRC = v("i9_reveal-arezzo-terminado");
export const LOGO_IN = beat(16);
export const TEXT_OUT = REVEAL_FROM;
