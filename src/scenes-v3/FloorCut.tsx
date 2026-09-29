import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";

type Props = { src: string; offsetSec?: number; seed: number };

// Un plano de piso a pantalla completa con micro-movimiento de cámara en mano
// (la referencia es grabación de celular) y el mismo grading cálido para todos.
export const FloorCut: React.FC<Props> = ({ src, offsetSec = 0, seed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const wobX = Math.sin(t * 5.1 + seed) * 6 + Math.sin(t * 11.7 + seed * 2) * 2;
  const wobY = Math.cos(t * 4.3 + seed * 1.3) * 6 + Math.sin(t * 9.2 + seed) * 2;
  const rot = Math.sin(t * 3.7 + seed * 0.7) * 0.35;
  const scale = 1.06 + t * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: "#1A120D", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${wobX}px, ${wobY}px) rotate(${rot}deg) scale(${scale})`,
          filter: "contrast(1.06) saturate(0.95) sepia(0.06)",
        }}
      >
        <Video
          src={staticFile(src)}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
          trimBefore={Math.round(offsetSec * fps)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
