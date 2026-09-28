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

// 0:05.8–~0:07.05 — Beneficio 1 de 3: "100% resistente al agua."
// Plano: clip-05 (interior arquitectónico), recorte cerrado sobre el piso.
export const Scene4aWaterproof: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0705" }}>
      <Interactive.Div
        name="Waterproof video wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 37], [1.16, 1.22], {
            easing: Easing.linear,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: "0px -140px",
        }}
      >
        <Video
          name="Interior arquitectonico"
          src={staticFile("videos/clip-05_horizontal_3840x2160_30fps.mov")}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={0}
        />
      </Interactive.Div>

      <AbsoluteFill
        name="Waterproof scrim"
        style={{
          background:
            "linear-gradient(to top, rgba(10,7,5,0.62) 0%, rgba(10,7,5,0.15) 34%, rgba(10,7,5,0) 58%)",
        }}
      />

      <Interactive.Div
        name="Waterproof text block"
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
          name="Waterproof rule"
          style={{
            width: 56,
            height: 1,
            backgroundColor: "rgba(251,246,239,0.7)",
            marginBottom: 18,
          }}
        />
        <Interactive.Div
          name="Waterproof label"
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
          100% resistente al agua.
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
