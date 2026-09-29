import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Shot } from "./Shot";
import { colors, grades, jost } from "./theme";

type Props = {
  taglineAt: number;
  collectionAt: number;
};

// Cierre: haz de luz sobre superficie oscura (eco de la referencia de marca) +
// wordmark en caja (como la contraportada del catálogo) + "Lujo a tu alcance."
export const Closing: React.FC<Props> = ({ taglineAt, collectionAt }) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

  const boxOpen = interpolate(frame, [0, 12], [50, 0], { easing: ease, ...clamp });
  const track = interpolate(frame, [0, 22], [0.5, 0.3], { easing: ease, ...clamp });
  const wordOpacity = interpolate(frame, [2, 10], [0, 1], clamp);
  const tagline = interpolate(frame, [taglineAt, taglineAt + 9], [0, 1], {
    easing: ease,
    ...clamp,
  });
  const collection = interpolate(frame, [collectionAt, collectionAt + 10], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <Shot
        src="videos-v2/v2-07_light-beam-dark-surface_1080x1920.mp4"
        srcWidth={1080}
        startSec={1}
        scale={[1.08, 1.16]}
        panX={[40, 0]}
        grade={grades.beam}
        shade={0.2}
      />
      <AbsoluteFill
        style={{ backgroundColor: colors.coffee, mixBlendMode: "multiply", opacity: 0.45 }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: jost,
          color: colors.cream,
          paddingBottom: 120,
        }}
      >
        <div
          style={{
            border: `3px solid ${colors.cream}`,
            padding: "40px 44px 40px 60px",
            clipPath: `inset(0 ${boxOpen}% 0 ${boxOpen}%)`,
            backgroundColor: "rgba(26,18,13,0.35)",
          }}
        >
          <div
            style={{
              fontSize: 78,
              fontWeight: 500,
              letterSpacing: `${track}em`,
              lineHeight: 1,
              whiteSpace: "nowrap",
              opacity: wordOpacity,
            }}
          >
            HABITA DEKO
          </div>
        </div>

        <div
          style={{
            marginTop: 64,
            fontSize: 76,
            fontWeight: 600,
            letterSpacing: "0.01em",
            lineHeight: 1,
            overflow: "hidden",
            paddingTop: 8,
          }}
        >
          <div style={{ transform: `translateY(${(1 - tagline) * 110}%)` }}>
            LUJO A TU ALCANCE.
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "0.26em",
            color: colors.beige,
            opacity: collection * 0.9,
          }}
        >
          COLECCIÓN TERRENA · PISOS SPC
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
