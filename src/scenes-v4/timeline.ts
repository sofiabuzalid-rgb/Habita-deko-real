// V4: el mismo lenguaje del reel de referencia (ráfaga → un piso por beat → ráfaga → cierre),
// construido solo con videos reales de pisos Habita Deko instalados (Arezzo, Sienna y roble claro).

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Música: "Loner" (Mixkit) a 117.51 BPM, recortada para que el frame 0 caiga en un compás.
export const BPM = 117.51;
export const FRAMES_PER_BEAT = (FPS * 60) / BPM; // ≈ 15.3
export const beat = (n: number) => Math.round(n * FRAMES_PER_BEAT);

export const DURATION_IN_FRAMES = 380;
export const CLOSE_FROM = beat(22);

const v = (name: string) => `videos-v4/v4-${name}.mp4`;

export type Cut = { src: string; from: number; to: number; offsetSec?: number };

// Compás 1: flashes de 3 frames (≈0.1s) alternando Arezzo / Sienna / roble claro.
const BURST_1 = ["fl01", "fl02", "fl03", "fl04", "fl05", "fl06", "fl07", "fl08", "fl09", "fl10", "fl11", "fl12"];
const DECEL = [
  { name: "fl13", len: 5 },
  { name: "fl15", len: 6 },
  { name: "st02_sienna-luz-piso", len: 7, offsetSec: 0.25 },
  { name: "st05_arezzo-boiserie-base", len: 7, offsetSec: 0.25 },
];

// Beats 4–19: un plano por beat; el ventanal de Arezzo y la habitación de Sienna respiran 2 beats.
const STEADY: { name: string; beats: number }[] = [
  { name: "st01_arezzo-ventanal-hero", beats: 2 },
  { name: "st02_sienna-luz-piso", beats: 1 },
  { name: "st03_arezzo-pasillo-fuga", beats: 1 },
  { name: "st04_claro-esquina-barrido", beats: 1 },
  { name: "st05_arezzo-boiserie-base", beats: 1 },
  { name: "st06_arezzo-reflejo-ventana", beats: 1 },
  { name: "st07_sienna-luz-muro", beats: 1 },
  { name: "st08_arezzo-veta-detalle", beats: 1 },
  { name: "st09_claro-revestimiento-muro", beats: 1 },
  { name: "st10_arezzo-piso-arboles", beats: 1 },
  { name: "st11_arezzo-pasillo-ventana", beats: 1 },
  { name: "st12_claro-tablas-barrido", beats: 1 },
  { name: "st13_sienna-veta-detalle", beats: 1 },
  { name: "st14_sienna-habitacion-luz", beats: 2 },
];

// Beats 20–22: segunda ráfaga antes del cierre.
const BURST_2 = ["fl14", "fl16", "fl04", "fl07", "fl10", "fl02", "fl08", "fl05", "fl09", "fl03"];

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
  let b = 4;
  for (const s of STEADY) {
    cuts.push({ src: v(s.name), from: beat(b), to: beat(b + s.beats) });
    b += s.beats;
  }
  f = beat(20);
  BURST_2.forEach((name, i) => {
    const to = i === BURST_2.length - 1 ? CLOSE_FROM : f + 3;
    cuts.push({ src: v(name), from: f, to, offsetSec: 0.05 });
    f = to;
  });
  cuts.push({ src: v("cl01_arezzo-ventanal-cierre"), from: CLOSE_FROM, to: DURATION_IN_FRAMES });
  return cuts;
};

export const CUTS = build();

export const FLASH_FRAMES = CUTS.filter((c) => c.to - c.from <= 4).map((c) => c.from);
