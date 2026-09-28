import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Easing,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Video } from "@remotion/media";
import { sansFont } from "../fonts";

// ~0:07.05–~0:08.3 — Beneficio 2 de 3: "Unilin Click."
// Plano: clip-01 (textura/veta de madera), otro momento del clip, zoom cerrado sobre la unión de tablas.
export const Scene4bClick: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0705" }}>
      <Interactive.Div
        name="Click video wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 37], [1.1, 1.16], {
            easing: Easing.linear,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Video
          name="Union de tablas"
          src={staticFile("videos/clip-01_vertical_2160x3840_30fps.mp4")}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={90}
        />
      </Interactive.Div>

      <AbsoluteFill
        name="Click scrim"
        style={{
          background:
            "linear-gradient(to top, rgba(10,7,5,0.62) 0%, rgba(10,7,5,0.15) 34%, rgba(10,7,5,0) 58%)",
        }}
      />

      <Interactive.Div
        name="Click text block"
        style={{
          position: "absolute",
          left: 84,
          right: 220,
          bottom: 360,
          opacity: interpolate(frame, [0, 8], [0, 1], {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Click rule"
          style={{
            width: 56,
            height: 1,
            backgroundColor: "rgba(251,246,239,0.7)",
            marginBottom: 18,
          }}
        />
        <Interactive.Div
          name="Click label"
          style={{
            fontFamily: sansFont,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: 38,
            lineHeight: 1.2,
            color: "#FBF6EF",
            letterSpacing: interpolate(frame, [0, 14], [8, 3], {
              easing: Easing.out(Easing.ease),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Unilin Click.
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
