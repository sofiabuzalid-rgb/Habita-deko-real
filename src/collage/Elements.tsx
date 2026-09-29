import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { BROWN } from "./timeline";

const { fontFamily: poppins } = loadFont("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const snap = Easing.bezier(0.2, 1.4, 0.4, 1);

// Palabra suelta, bold, centrada, con mucho blanco alrededor. Entra casi en corte (3 frames).
export const WordCard: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 3], [0.92, 1], { easing: snap, ...clamp });
  const o = interpolate(frame, [0, 2], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: poppins,
          fontWeight: 700,
          fontSize: 100,
          letterSpacing: "-0.01em",
          color,
          transform: `scale(${s})`,
          opacity: o,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Tarjeta del collage: video real en bucle (vivo), esquinas redondeadas, entrada con un pop corto.
export const CollageCard: React.FC<{ src: string; x: number; y: number; w: number; h: number }> = ({
  src,
  x,
  y,
  w,
  h,
}) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 5], [0.9, 1], { easing: snap, ...clamp });
  const o = interpolate(frame, [0, 2], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 30,
        overflow: "hidden",
        transform: `scale(${s})`,
        opacity: o,
        boxShadow: "0 10px 30px rgba(40,28,18,0.10)",
        backgroundColor: "#E9E4DE",
      }}
    >
      <Video
        src={staticFile(src)}
        style={{ width: "100%", height: "100%" }}
        objectFit="cover"
        muted
        loop
      />
    </div>
  );
};

// Cierre limpio: logo original (vector del catálogo) + "Pisos SPC Premium".
export const Closing: React.FC<{ subtitleAt: number }> = ({ subtitleAt }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 4], [0.94, 1], { easing: snap, ...clamp });
  const o = interpolate(frame, [0, 2], [0, 1], clamp);
  const sub = interpolate(frame, [subtitleAt, subtitleAt + 2], [0, 1], clamp);
  const subS = interpolate(frame, [subtitleAt, subtitleAt + 3], [0.94, 1], { easing: snap, ...clamp });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Img
        src={staticFile("brand/habita-deko-logo-brown.svg")}
        style={{ width: 700, transform: `scale(${s})`, opacity: o }}
      />
      <div
        style={{
          marginTop: 40,
          fontFamily: poppins,
          fontWeight: 500,
          fontSize: 42,
          color: BROWN,
          opacity: sub,
          transform: `scale(${subS})`,
        }}
      >
        Pisos SPC Premium
      </div>
    </AbsoluteFill>
  );
};
