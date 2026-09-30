// V3: recreación del lenguaje visual del reel de referencia (pisos en sucesión continua).
// Medido en la referencia: ráfaga inicial de cortes de ~0.1s que desacelera, luego un plano
// por beat (~0.5s), una segunda ráfaga y loop. Aquí se cierra con el wordmark.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Música: "Loner" (Mixkit) a 117.51 BPM, recortada para que el frame 0 caiga en un compás.
export const BPM = 117.51;
export const FRAMES_PER_BEAT = (FPS * 60) / BPM; // ≈ 15.3
export const beat = (n: number) => Math.round(n * FRAMES_PER_BEAT);

export const DURATION_IN_FRAMES = 380;

const v = (name: string) => `videos-v3/v3-${name}.mp4`;

export type Cut = { src: string; from: number; to: number; offsetSec?: number };

// Compás 1: ráfaga de flashes de 3 frames (≈0.1s) que desacelera hacia el drop.
const BURST_1 = [
  "fl01_strip-parquet-topdown",
  "fl07_diamond-parquet-shadow",
  "fl04_herringbone-sofa",
  "fl10_light-oak-chevron-b",
  "fl06_dark-herringbone-topdown",
  "fl03_herringbone-chair",
  "fl12_light-plank-macro-b",
  "fl08_herringbone-dark-warm-b",
  "fl02_dark-floor-sunbeam",
  "fl14_herringbone-honey-b",
  "fl05_dark-plank-room",
  "fl11_herringbone-warm-b",
];
const DECEL = [
  { name: "fl09_herringbone-sunlight-c", len: 5 },
  { name: "fl13_plank-hall-b", len: 6 },
  { name: "st02_diamond-parquet-light", len: 7, offsetSec: 0.5 },
  { name: "st14_herringbone-slide-b", len: 7, offsetSec: 0.5 },
];

// Beats 4–19: un piso por beat, alternando tono (cálido / claro / oscuro) y dirección de tablas.
const STEADY = [
  "st01_herringbone-sunlight-a",
  "st05_light-oak-chevron",
  "st08_herringbone-dark-warm",
  "st02_diamond-parquet-light",
  "st04_herringbone-slide-a",
  "st03_pale-laminate-floor-level",
  "st11_herringbone-honey",
  "st15_dark-floor-sunbeam",
  "st10_herringbone-sunlight-b",
  "st07_light-plank-macro",
  "st06_herringbone-warm-pan",
  "st13_parquet-hall",
  "st14_herringbone-slide-b",
  "st12_diamond-parquet-light-b",
  "st16_herringbone-edge",
  "st09_plank-hall-walk",
];

// Beats 20–22: segunda ráfaga antes del cierre.
const BURST_2 = [
  "fl10_light-oak-chevron-b",
  "fl01_strip-parquet-topdown",
  "fl06_dark-herringbone-topdown",
  "fl12_light-plank-macro-b",
  "fl02_dark-floor-sunbeam",
  "fl07_diamond-parquet-shadow",
  "fl05_dark-plank-room",
  "fl09_herringbone-sunlight-c",
  "fl14_herringbone-honey-b",
  "fl11_herringbone-warm-b",
];

export const CLOSE_FROM = beat(22);

const build = (): Cut[] => {
  const cuts: Cut[] = [];
  let f = 0;
  for (const name of BURST_1) {
    cuts.push({ src: v(name), from: f, to: f + 3 });
    f += 3;
  }
  for (const d of DECEL) {
    cuts.push({ src: v(d.name), from: f, to: f + d.len, offsetSec: d.offsetSec });
    f += d.len;
  }
  STEADY.forEach((name, i) => {
    cuts.push({ src: v(name), from: beat(4 + i), to: beat(5 + i) });
  });
  f = beat(20);
  BURST_2.forEach((name, i) => {
    const to = i === BURST_2.length - 1 ? CLOSE_FROM : f + 3;
    cuts.push({ src: v(name), from: f, to, offsetSec: 0.1 });
    f = to;
  });
  cuts.push({
    src: v("cl01_herringbone-sunlight-close"),
    from: CLOSE_FROM,
    to: DURATION_IN_FRAMES,
  });
  return cuts;
};

export const CUTS = build();

// Frames donde hay un flash (para el "tic" discreto de sound design).
export const FLASH_FRAMES = CUTS.filter((c) => c.to - c.from <= 4).map((c) => c.from);
