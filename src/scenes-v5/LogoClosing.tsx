import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Jost";

const { fontFamily: jost } = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Mismo cierre que V4, pero con el logo original de Habita Deko (vector extraído del catálogo)
// en lugar del wordmark tipográfico.
export const LogoClosing: React.FC<{ claimAt: number }> = ({ claimAt }) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const shade = interpolate(frame, [0, 10], [0, 0.46], clamp);
  const open = interpolate(frame, [2, 14], [50, 0], { easing: ease, ...clamp });
  const scale = interpolate(frame, [2, 26], [1.04, 1], { easing: ease, ...clamp });
  const claim = interpolate(frame, [claimAt, claimAt + 10], [0, 1], { easing: ease, ...clamp });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: `rgba(26,18,13,${shade})` }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingBottom: 140,
        }}
      >
        <Img
          src={staticFile("brand/habita-deko-logo-white.svg")}
          style={{
            width: 760,
            clipPath: `inset(0 ${open}% 0 ${open}%)`,
            transform: `scale(${scale})`,
          }}
        />
        <div style={{ marginTop: 44, overflow: "hidden", paddingTop: 6 }}>
          <div
            style={{
              fontFamily: jost,
              fontSize: 40,
              fontWeight: 400,
              letterSpacing: "0.32em",
              paddingLeft: "0.32em",
              color: "#F1E9DE",
              opacity: claim,
              transform: `translateY(${(1 - claim) * 100}%)`,
            }}
          >
            LUJO A TU ALCANCE
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
