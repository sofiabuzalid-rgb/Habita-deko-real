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

// ~0:08.3–0:09.5 (+ cola de transición hacia la escena de lifestyle) —
// Beneficio 3 de 3: "Base acústica integrada."
// Plano: clip-02 (pisada descalza), otro momento del clip — pisada silenciosa, amortiguada.
export const Scene4cAcoustic: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0705" }}>
      <Interactive.Div
        name="Acoustic video wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 55], [1.04, 1.1], {
            easing: Easing.linear,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Video
          name="Pisada amortiguada"
          src={staticFile("videos/clip-02_horizontal_1920x1080_24fps.mp4")}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={150}
        />
      </Interactive.Div>

      <AbsoluteFill
        name="Acoustic scrim"
        style={{
          background:
            "linear-gradient(to top, rgba(10,7,5,0.62) 0%, rgba(10,7,5,0.15) 34%, rgba(10,7,5,0) 58%)",
        }}
      />

      <Interactive.Div
        name="Acoustic text block"
        style={{
          position: "absolute",
          left: 84,
          right: 220,
          bottom: 360,
          opacity: interpolate(frame, [0, 8, 26, 36], [0, 1, 1, 0], {
            easing: Easing.inOut(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Acoustic rule"
          style={{
            width: 56,
            height: 1,
            backgroundColor: "rgba(251,246,239,0.7)",
            marginBottom: 18,
          }}
        />
        <Interactive.Div
          name="Acoustic label"
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
          Base acústica integrada.
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
