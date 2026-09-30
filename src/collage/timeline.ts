// HabitaDekoCollageReel — mapa temporal tomado del reel de referencia (medido a 60 fps):
// palabras sueltas sobre blanco (la primera dura 2 beats, luego ~1 beat) → collage que se arma
// tarjeta por tarjeta (dos entradas a medio beat) → collage completo → se desarma en espejo → cierre.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Música: "Cat Walk" (Mixkit) a 130 BPM; arranca 4.6s antes de su drop para que el drop
// coincida con la entrada del collage.
export const BPM = 130;
export const FRAMES_PER_BEAT = (FPS * 60) / BPM; // ≈ 13.85 (0.46s, como los ~0.47s de la referencia)
export const beat = (n: number) => Math.round(n * FRAMES_PER_BEAT);

export const DURATION_IN_FRAMES = 510; // 17s

export type Word = { text: string; at: number; color: string };

export const BROWN = "#8A5A3B";
export const INK = "#141414";

export const WORDS: Word[] = [
  { text: "Tal vez", at: beat(0), color: BROWN },
  { text: "un", at: beat(2), color: INK },
  { text: "buen espacio", at: beat(3), color: INK },
  { text: "empieza", at: beat(5), color: INK },
  { text: "desde el piso.", at: beat(7), color: BROWN },
];

export const COLLAGE_FROM = beat(10);
export const CLOSE_FROM = beat(26);
export const SUBTITLE_AT = beat(27);

export type Card = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  inAt: number;
  outAt: number;
};

const c = (name: string) => `videos-collage/${name}.mp4`;

// Posiciones y tamaños medidos en la referencia y llevados a 1080×1920.
// Cada tarjeta entra en su beat y sale en orden inverso (la primera en entrar es la última en salir).
export const CARDS: Card[] = [
  { src: c("card1_arezzo-ventanal"), x: 28, y: 102, w: 614, h: 819, inAt: beat(10), outAt: beat(26) },
  { src: c("card2_arezzo-pasillo"), x: 273, y: 796, w: 671, h: 892, inAt: beat(11), outAt: beat(25) },
  { src: c("card3_sienna-luz"), x: 51, y: 1239, w: 415, h: 546, inAt: beat(12), outAt: beat(24.5) },
  { src: c("card4_claro-muro"), x: 591, y: 341, w: 432, h: 568, inAt: beat(13), outAt: beat(24) },
  { src: c("card5_arezzo-boiserie"), x: 489, y: 1142, w: 551, h: 734, inAt: beat(14), outAt: beat(23) },
  { src: c("card6_claro-esquina"), x: 97, y: 574, w: 449, h: 597, inAt: beat(14.5), outAt: beat(22.5) },
  { src: c("card7_arezzo-reflejo"), x: 455, y: 574, w: 489, h: 722, inAt: beat(15), outAt: beat(22) },
];
