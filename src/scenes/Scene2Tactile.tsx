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

// 0:02.3–0:04.3 — "Se siente como madera."
// Plano: clip-02 (pies descalzos caminando sobre el piso), recorte vertical centrado.
export const Scene2Tactile: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0705" }}>
      <Interactive.Div
        name="Tactile video wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 60], [1.03, 1.09], {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Video
          name="Pies descalzos sobre el piso"
          src={staticFile("videos/clip-02_horizontal_1920x1080_24fps.mp4")}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={30}
        />
      </Interactive.Div>

      <AbsoluteFill
        name="Tactile scrim"
        style={{
          background:
            "linear-gradient(to top, rgba(10,7,5,0.6) 0%, rgba(10,7,5,0.15) 30%, rgba(10,7,5,0) 55%)",
        }}
      />

      <Interactive.Div
        name="Tactile text mask"
        style={{
          position: "absolute",
          left: 84,
          right: 220,
          bottom: 360,
          overflow: "hidden",
        }}
      >
        <Interactive.Div
          name="Tactile headline"
          style={{
            fontFamily: serifFont,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 64,
            lineHeight: 1.05,
            color: "#FBF6EF",
            translate: interpolate(frame, [18, 36], ["0px 115%", "0px 0%"], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Se siente como madera.
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
