import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Easing,
  useCurrentFrame,
} from "remotion";
import { serifFont } from "../fonts";

// 0:04.3–0:05.8 — "Pero no lo es." — el pequeño reveal del reel.
// Corte contundente: tarjeta sólida, sin video, para un golpe gráfico limpio.
export const Scene3Reveal: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#2B1E14",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Interactive.Div
        name="Reveal headline"
        style={{
          fontFamily: serifFont,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 92,
          color: "#FBF6EF",
          textAlign: "center",
          opacity: interpolate(frame, [0, 8], [0, 1], {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 10], [0.94, 1], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Pero no lo es.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
