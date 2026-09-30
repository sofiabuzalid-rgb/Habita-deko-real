import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Jost";

const { fontFamily: jost } = loadFont("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Único texto del reel: wordmark en caja (como la contraportada del catálogo) + claim.
export const Closing: React.FC<{ claimAt: number }> = ({ claimAt }) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const shade = interpolate(frame, [0, 10], [0, 0.46], clamp);
  const open = interpolate(frame, [2, 14], [50, 0], { easing: ease, ...clamp });
  const track = interpolate(frame, [2, 26], [0.46, 0.3], { easing: ease, ...clamp });
  const claim = interpolate(frame, [claimAt, claimAt + 10], [0, 1], { easing: ease, ...clamp });

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
        <div style={{ marginTop: 44, overflow: "hidden", paddingTop: 6 }}>
          <div
            style={{
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
