import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { HEIGHT, WIDTH } from "./theme";

export type ShotProps = {
  src: string;
  // Ancho nativo del archivo (1440 para los recortes 3:4, 1080 para los verticales).
  srcWidth: 1080 | 1440;
  startSec: number;
  playbackRate?: number;
  scale?: [number, number];
  // Desplazamiento horizontal en px (pan digital), dentro del margen extra del recorte 3:4.
  panX?: [number, number];
  panY?: [number, number];
  grade: string;
  // Oscurecimiento para legibilidad del texto.
  shade?: number;
};

// Un plano: video recortado/animado con push-in o pan, grading cálido y viñeta.
export const Shot: React.FC<ShotProps> = ({
  src,
  srcWidth,
  startSec,
  playbackRate = 1,
  scale = [1, 1],
  panX = [0, 0],
  panY = [0, 0],
  grade,
  shade = 0.25,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: Easing.bezier(0.33, 0, 0.2, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s = interpolate(t, [0, 1], scale);
  const x = interpolate(t, [0, 1], panX);
  const y = interpolate(t, [0, 1], panY);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0E0906", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: srcWidth,
          height: HEIGHT,
          left: (WIDTH - srcWidth) / 2,
          top: 0,
          transform: `translate(${x}px, ${y}px) scale(${s})`,
          filter: grade,
        }}
      >
        <Video
          src={staticFile(src)}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={Math.round(startSec * fps)}
          playbackRate={playbackRate}
        />
      </div>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 85% 70% at 50% 45%, rgba(14,9,6,0) 40%, rgba(14,9,6,0.55) 100%), rgba(14,9,6,${shade})`,
        }}
      />
    </AbsoluteFill>
  );
};
