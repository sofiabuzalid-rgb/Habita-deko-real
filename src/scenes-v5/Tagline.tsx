import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Jost";

const { fontFamily: jost } = loadFont("normal", {
  weights: ["300", "400"],
  subsets: ["latin"],
});

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Rótulo editorial pequeño y fino, fijo sobre el montaje (como el rótulo del reel de referencia).
// "SPC PREMIUM" va debajo, más pequeño, como descriptor secundario.
export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const inMain = interpolate(frame, [0, 14], [0, 1], { easing: ease, ...clamp });
  const inSub = interpolate(frame, [8, 22], [0, 1], { easing: ease, ...clamp });
  const out = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      {/* Sombra muy difusa detrás del rótulo: mantiene la legibilidad sobre pisos claros sin verse como caja. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 60% 9% at 50% 46.5%, rgba(20,13,9,0.32) 0%, rgba(20,13,9,0) 100%)",
          opacity: inMain * out,
        }}
      />
      <div
        style={{
          marginTop: -80,
          fontFamily: jost,
          fontWeight: 300,
          fontSize: 60,
          letterSpacing: "0.03em",
          color: "#FBF6EF",
          textShadow: "0 1px 3px rgba(20,13,9,0.35), 0 2px 18px rgba(20,13,9,0.55)",
          opacity: inMain * out,
          transform: `translateY(${(1 - inMain) * 10}px)`,
        }}
      >
        Todo empieza desde el piso.
      </div>
      <div
        style={{
          marginTop: 22,
          fontFamily: jost,
          fontWeight: 400,
          fontSize: 28,
          letterSpacing: "0.46em",
          paddingLeft: "0.46em",
          color: "#FBF6EF",
          textShadow: "0 1px 3px rgba(20,13,9,0.45), 0 2px 14px rgba(20,13,9,0.55)",
          opacity: inSub * out,
        }}
      >
        SPC PREMIUM
      </div>
    </AbsoluteFill>
  );
};
