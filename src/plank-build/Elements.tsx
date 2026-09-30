import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";
import { Board, VANISHING } from "./boards";

const { fontFamily: playfair } = loadFont("normal", { weights: ["400"], subsets: ["latin"] });

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const PLATE = "videos-planks/plate_sienna.png";
export const ENTER_FRAMES = 20;

// Subsuelo sin terminar: neutro cálido, antes de que llegue la primera tabla.
export const Underlay: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(ellipse 90% 70% at 50% 40%, #D8D0C5 0%, #C9C0B4 70%, #BDB3A6 100%)",
    }}
  />
);

// Una tabla real: el propio fotograma del piso recortado con el polígono de la tabla.
// Se desliza a lo largo de su fila (escala alrededor del punto de fuga = movimiento correcto en perspectiva)
// o, si inicia una fila nueva, entra en ángulo desde el lado abierto, como el click del canto largo.
export const PlankPiece: React.FC<{ board: Board; angleIn: boolean }> = ({ board, angleIn }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, ENTER_FRAMES], [0, 1], clamp);
  const e = Easing.bezier(0.22, 1, 0.36, 1)(t);
  const settle = interpolate(frame, [ENTER_FRAMES - 2, ENTER_FRAMES + 1, ENTER_FRAMES + 5], [0, 1, 0], clamp);

  const scale = angleIn ? interpolate(e, [0, 1], [1.05, 1]) : interpolate(e, [0, 1], [1.3, 1]);
  const tx = angleIn ? interpolate(e, [0, 1], [160, 0]) : 0;
  const rot = angleIn ? interpolate(e, [0, 1], [1.6, 0]) : 0;
  const bump = settle * 3; // micro-asentamiento al hacer click
  const opacity = interpolate(frame, [0, 5], [0, 1], clamp);
  const shadow = interpolate(frame, [0, ENTER_FRAMES], [0.45, 0], clamp);

  const clip = `polygon(${board.poly.map(([x, y]) => `${x}px ${y}px`).join(", ")})`;
  return (
    <AbsoluteFill
      style={{
        opacity,
        filter: shadow > 0.01 ? `drop-shadow(0 ${14 * shadow}px ${22 * shadow}px rgba(40,26,14,${shadow}))` : undefined,
      }}
    >
      <AbsoluteFill
        style={{
          transformOrigin: `${VANISHING.x}px ${VANISHING.y}px`,
          transform: `translate(${tx}px, ${bump}px) rotate(${rot}deg) scale(${scale})`,
          clipPath: clip,
        }}
      >
        <Img src={staticFile(PLATE)} style={{ width: 1080, height: 1920 }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Frase fija, pequeña y fina, mientras el piso toma forma.
export const Phrase: React.FC<{ outAt: number }> = ({ outAt }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 18], [0, 1], clamp) * interpolate(frame, [outAt - 12, outAt], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div
        style={{
          marginTop: 250,
          fontFamily: playfair,
          fontWeight: 400,
          fontSize: 46,
          letterSpacing: "0.01em",
          color: "#412213",
          textShadow: "0 1px 10px rgba(255,248,238,0.55)",
          opacity: o,
        }}
      >
        Todo empieza desde el piso.
      </div>
    </AbsoluteFill>
  );
};

// Logo original (vector del catálogo), discreto, con un alejamiento suave al asentarse.
export const Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 40], [1.35, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), ...clamp });
  const o = interpolate(frame, [0, 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 55% 12% at 50% 50%, rgba(40,24,12,0.28) 0%, rgba(40,24,12,0) 100%)",
          opacity: o,
        }}
      />
      <Img
        src={staticFile("brand/habita-deko-logo-white.svg")}
        style={{
          width: 480,
          transform: `scale(${s})`,
          opacity: o,
          filter: "drop-shadow(0 2px 10px rgba(30,18,8,0.45))",
        }}
      />
    </AbsoluteFill>
  );
};
