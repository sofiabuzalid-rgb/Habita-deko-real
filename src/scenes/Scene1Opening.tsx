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

// 0:00–0:02.3 — "Parece madera."
// Plano: clip-01 (textura de madera, luz y sombra atravesando el plano).
export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0705" }}>
      <Interactive.Div
        name="Opening video wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 84], [1, 1.06], {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Video
          name="Textura de madera"
          src={staticFile("videos/clip-01_vertical_2160x3840_30fps.mp4")}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={0}
        />
      </Interactive.Div>

      <AbsoluteFill
        name="Opening scrim"
        style={{
          background:
            "linear-gradient(to top, rgba(10,7,5,0.6) 0%, rgba(10,7,5,0.15) 30%, rgba(10,7,5,0) 55%)",
        }}
      />

      <Interactive.Div
        name="Opening text mask"
        style={{
          position: "absolute",
          left: 84,
          right: 220,
          bottom: 360,
          overflow: "hidden",
          opacity: interpolate(frame, [50, 66], [1, 0], {
            easing: Easing.inOut(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Opening headline"
          style={{
            fontFamily: serifFont,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 64,
            lineHeight: 1.05,
            color: "#FBF6EF",
            translate: interpolate(frame, [12, 30], ["0px 115%", "0px 0%"], {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Parece madera.
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
