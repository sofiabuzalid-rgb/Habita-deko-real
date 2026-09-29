import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Shot } from "./Shot";
import { colors, grades } from "./theme";

type Props = {
  // Frame local en que las dos mitades se encuentran (cae en beat, con el SFX de click).
  joinAt: number;
};

// "Unilin Click" como gesto gráfico: dos mitades de la misma tabla entran desde los lados
// y encajan en el beat. Es una metáfora visual, no una demostración del sistema real.
export const ClickJoin: React.FC<Props> = ({ joinAt }) => {
  const frame = useCurrentFrame();

  // Las mitades ya asoman en el frame 0 (sin pantalla negra) y aceleran hasta encajar.
  const slide = interpolate(frame, [0, joinAt], [1, 0], {
    easing: Easing.in(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const settle = interpolate(frame, [joinAt, joinAt + 3, joinAt + 12], [1, 1.035, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const seam = interpolate(frame, [joinAt - 1, joinAt, joinAt + 10], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const half = (side: "left" | "right") => (
    <AbsoluteFill
      style={{
        clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
        transform: `translateX(${(side === "left" ? -1 : 1) * slide * 400}px)`,
      }}
    >
      <Shot
        src="videos-v2/v2-03_dark-walnut-grain_1440x1920.mp4"
        srcWidth={1440}
        startSec={4}
        scale={[1.18, 1.1]}
        grade={grades.warm}
        shade={0.3}
      />
    </AbsoluteFill>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.deep }}>
      <AbsoluteFill style={{ transform: `scale(${settle})` }}>
        {half("left")}
        {half("right")}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: 539,
          width: 2,
          backgroundColor: colors.cream,
          opacity: seam * 0.9,
          boxShadow: `0 0 40px 8px rgba(251,246,239,${seam * 0.35})`,
        }}
      />
    </AbsoluteFill>
  );
};
