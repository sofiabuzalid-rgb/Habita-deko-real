import {
  AbsoluteFill,
  Interactive,
  interpolate,
  Easing,
  useCurrentFrame,
} from "remotion";
import { sansFont, serifFont } from "../fonts";

// 0:13.0–0:16.0 — Cierre premium: wordmark, tagline y colección.
// Fondo sólido color marca (mismo tono que la contraportada del catálogo Habita Deko).
export const Scene6Closing: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#5B4030",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Interactive.Div
        name="Closing logo box"
        style={{
          border: "1px solid rgba(251,246,239,0.9)",
          padding: "26px 52px",
          opacity: interpolate(frame, [28, 44], [0, 1], {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [28, 46], [0.97, 1], {
            easing: Easing.out(Easing.cubic),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Interactive.Div
          name="Closing wordmark"
          style={{
            fontFamily: sansFont,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: 52,
            letterSpacing: 10,
            color: "#FBF6EF",
          }}
        >
          Habita Deko
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="Closing tagline"
        style={{
          fontFamily: serifFont,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 30,
          color: "#F1E9DE",
          marginTop: 34,
          opacity: interpolate(frame, [52, 66], [0, 1], {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Un buen espacio empieza desde el piso.
      </Interactive.Div>

      <Interactive.Div
        name="Closing collection line"
        style={{
          fontFamily: sansFont,
          fontWeight: 300,
          textTransform: "uppercase",
          fontSize: 20,
          letterSpacing: 4,
          color: "rgba(241,233,222,0.65)",
          marginTop: 22,
          opacity: interpolate(frame, [68, 80], [0, 1], {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Colección Terrena · SPC EIR
      </Interactive.Div>
    </AbsoluteFill>
  );
};
