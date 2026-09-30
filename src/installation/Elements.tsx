import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";
import { CREAM } from "./timeline";

const { fontFamily: playfair } = loadFont("normal", { weights: ["400"], subsets: ["latin"] });
loadFont("italic", { weights: ["400"], subsets: ["latin"] });

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.33, 0, 0.2, 1);

// Tono cálido común (la obra en concreto se ve fría en bruto).
export const WARM = "sepia(0.22) saturate(0.9) contrast(1.06) brightness(0.97)";

// Plano de la instalación: video real con un push-in muy lento para que cada etapa "avance".
export const StageShot: React.FC<{ src: string; offsetSec?: number; push?: number }> = ({
  src,
  offsetSec = 0,
  push = 0.05,
}) => {
  const frame = useCurrentFrame();
  const s = 1 + (frame / 30) * push;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${s})`, filter: WARM }}>
        <Video
          src={staticFile(src)}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={Math.round(offsetSec * 30)}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 48%, rgba(40,20,10,0) 50%, rgba(40,20,10,0.35) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Franja horizontal del intro: aparece en corte, pasa de B/N a color y se recoge hacia la izquierda.
export const Strip: React.FC<{
  src: string;
  top: number;
  height: number;
  colorAt: number;
  outFrom: number;
}> = ({ src, top, height, colorAt, outFrom }) => {
  const frame = useCurrentFrame();
  const gray = interpolate(frame, [colorAt, colorAt + 8], [1, 0], clamp);
  const cut = interpolate(frame, [outFrom, outFrom + 18], [0, 100], { easing: ease, ...clamp });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top,
        width: 1080,
        height,
        overflow: "hidden",
        clipPath: `inset(0 ${cut}% 0 0)`,
      }}
    >
      <Video
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", filter: `grayscale(${gray}) ${WARM}` }}
        objectFit="cover"
        muted
        loop
      />
    </div>
  );
};

// Frase editorial en tres bloques, como en la referencia:
// "TODO / Empieza"  ·  "desde"  ·  "EL / Piso."  → la itálica pasa a mayúsculas a mitad del reel.
export const Phrase: React.FC<{ morphAt: number; outAt: number; videoAt: number }> = ({ morphAt, outAt, videoAt }) => {
  const frame = useCurrentFrame();
  const scrim = interpolate(frame, [videoAt, videoAt + 10], [0, 1], clamp);
  const o = interpolate(frame, [0, 14], [0, 1], clamp) * interpolate(frame, [outAt - 10, outAt], [1, 0], clamp);
  const m = interpolate(frame, [morphAt, morphAt + 8], [0, 1], clamp);
  const caps: React.CSSProperties = {
    fontFamily: playfair,
    fontWeight: 400,
    fontSize: 46,
    letterSpacing: "0.02em",
    lineHeight: 1.05,
  };
  const ital: React.CSSProperties = { ...caps, fontStyle: "italic", fontSize: 48 };
  const swap = (lower: string, upper: string, align: "left" | "right") => (
    <div style={{ position: "relative", height: 52, textAlign: align }}>
      <div style={{ ...ital, position: "absolute", [align]: 0, opacity: 1 - m, whiteSpace: "nowrap" }}>{lower}</div>
      <div style={{ ...ital, fontSize: 44, position: "absolute", [align]: 0, opacity: m, whiteSpace: "nowrap" }}>
        {upper}
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ color: CREAM, opacity: o, textShadow: "0 1px 12px rgba(30,15,8,0.45)" }}>
      {/* Franja cálida muy difusa detrás de la frase: legible sobre muros blancos de obra. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(45,22,10,0) 41%, rgba(45,22,10,0.42) 47%, rgba(45,22,10,0.42) 55%, rgba(45,22,10,0) 61%)",
          opacity: scrim,
        }}
      />
      <div style={{ position: "absolute", left: 76, top: 912, width: 360 }}>
        <div style={caps}>TODO</div>
        {swap("Empieza", "EMPIEZA", "left")}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 930, textAlign: "center", ...ital, fontSize: 58 }}>
        desde
      </div>
      <div style={{ position: "absolute", right: 76, top: 912, width: 300, textAlign: "right" }}>
        <div style={caps}>EL</div>
        {swap("Piso.", "PISO.", "right")}
      </div>
    </AbsoluteFill>
  );
};

// Franja central que se abre y revela el video (primero una banda, luego pantalla completa).
export const BandReveal: React.FC<{ holdAt: number; fullAt: number; children: React.ReactNode }> = ({
  holdAt,
  fullAt,
  children,
}) => {
  const frame = useCurrentFrame();
  const band = interpolate(frame, [0, holdAt], [50, 38.5], { easing: ease, ...clamp });
  const full = interpolate(frame, [holdAt + 6, fullAt], [band, 0], { easing: ease, ...clamp });
  const inset = frame < holdAt + 6 ? band : full;
  return <AbsoluteFill style={{ clipPath: `inset(${inset}% 0 ${inset}% 0)` }}>{children}</AbsoluteFill>;
};

// Logo original (vector del catálogo): entra grande y se aleja hasta asentarse, discreto.
export const LogoSettle: React.FC = () => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 45], [1.6, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), ...clamp });
  const o = interpolate(frame, [0, 12], [0, 1], clamp);
  const shade = interpolate(frame, [0, 20], [0, 0.32], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(40,20,10,${shade})` }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img
          src={staticFile("brand/habita-deko-logo-white.svg")}
          style={{ width: 520, marginTop: -60, transform: `scale(${s})`, opacity: o }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
