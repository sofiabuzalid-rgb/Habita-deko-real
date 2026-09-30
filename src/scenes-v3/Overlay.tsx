import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Jost";

const { fontFamily: jost } = loadFont("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Rótulo fijo, pequeño y discreto, como el de la referencia. No compite con el piso.
export const Caption: React.FC<{ until: number }> = ({ until }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [until - 6, until], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          marginTop: -120,
          fontFamily: jost,
          fontWeight: 400,
          fontSize: 38,
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.92)",
          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          opacity,
        }}
      >
        pisos que dan ganas de guardar
      </div>
    </AbsoluteFill>
  );
};

// Cierre: el piso sigue en pantalla; encima, el wordmark en caja (como la contraportada del catálogo).
export const Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const shade = interpolate(frame, [0, 8], [0, 0.42], clamp);
  const open = interpolate(frame, [2, 14], [50, 0], { easing: ease, ...clamp });
  const track = interpolate(frame, [2, 24], [0.46, 0.3], { easing: ease, ...clamp });
  const sub = interpolate(frame, [14, 24], [0, 1], clamp);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(26,18,13,${shade})` }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: jost,
          color: "#FBF6EF",
          paddingBottom: 140,
        }}
      >
        <div
          style={{
            border: "3px solid #FBF6EF",
            padding: "38px 44px 38px 64px",
            clipPath: `inset(0 ${open}% 0 ${open}%)`,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 500,
              letterSpacing: `${track}em`,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            HABITA DEKO
          </div>
        </div>
        <div
          style={{
            marginTop: 34,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "0.26em",
            color: "#F1E9DE",
            opacity: sub,
          }}
        >
          PISOS SPC · COLECCIÓN TERRENA
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
