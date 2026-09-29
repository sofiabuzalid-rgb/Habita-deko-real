import { loadFont } from "@remotion/google-fonts/Jost";

// V2: una sola familia geométrica, pesos altos para titulares legibles en celular.
export const { fontFamily: jost } = loadFont("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Música: "Deep Urban" (Mixkit) a 124 BPM, recortada para que el frame 0 caiga en downbeat.
export const BPM = 124;
export const FRAMES_PER_BEAT = (FPS * 60) / BPM; // 14.516…

// Frame absoluto del beat n (redondeado al frame más cercano).
export const beat = (n: number) => Math.round(n * FRAMES_PER_BEAT);
export const bar = (n: number) => beat(n * 4);

// 7 compases de música + cola para el cierre.
export const DURATION_IN_FRAMES = 420;

export const colors = {
  cream: "#FBF6EF",
  beige: "#E9DCCB",
  coffee: "#5B4030",
  deep: "#1A120D",
  ink: "#0E0906",
};

// Grading común: cálido, contraste medio, saturación contenida (paleta madera/café/crema).
export const grades = {
  warm: "contrast(1.08) saturate(0.88) sepia(0.12) brightness(0.96)",
  warmDark: "contrast(1.12) saturate(0.85) sepia(0.18) brightness(0.82)",
  // El agua se lleva a monocromo café para no romper la paleta de marca.
  waterMono: "grayscale(1) sepia(0.55) contrast(1.25) brightness(0.78)",
  beam: "grayscale(0.3) sepia(0.45) contrast(1.15) brightness(0.92)",
};

// Safe areas de Instagram Reels (aprox.): UI arriba ~220px, abajo ~420px, lateral derecho ~140px.
export const SAFE = {
  left: 84,
  right: 160,
  top: 250,
  bottom: 460,
};
