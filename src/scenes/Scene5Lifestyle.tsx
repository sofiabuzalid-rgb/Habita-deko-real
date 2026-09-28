import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Easing,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Video } from "@remotion/media";
import { serifFont } from "../fonts";

// 0:09.5–0:13.0 — "Diseñado para la vida real."
// Plano: clip-05 (interior arquitectónico completo), el mejor plano lifestyle. Ritmo lento, respira.
export const Scene5Lifestyle: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0705" }}>
      <Interactive.Div
        name="Lifestyle video wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 125], [1, 1.05], {
            easing: Easing.linear,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Video
          name="Interior lifestyle completo"
          src={staticFile("videos/clip-05_horizontal_3840x2160_30fps.mov")}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={40}
        />
      </Interactive.Div>

      <AbsoluteFill
        name="Lifestyle scrim"
        style={{
          background:
            "linear-gradient(to top, rgba(10,7,5,0.58) 0%, rgba(10,7,5,0.14) 32%, rgba(10,7,5,0) 56%)",
        }}
      />

      <Interactive.Div
        name="Lifestyle text mask"
        style={{
          position: "absolute",
          left: 84,
          right: 220,
          bottom: 360,
          overflow: "hidden",
          opacity: interpolate(frame, [92, 104], [1, 0], {
            easing: Easing.inOut(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Lifestyle headline"
          style={{
            fontFamily: serifFont,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 64,
            lineHeight: 1.05,
            color: "#FBF6EF",
            translate: interpolate(frame, [24, 42], ["0px 115%", "0px 0%"], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Diseñado para la vida real.
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
