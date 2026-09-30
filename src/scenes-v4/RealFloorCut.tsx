import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";

type Props = { src: string; offsetSec?: number };

// Plano real de Habita Deko (ya reencuadrado a 9:16 y sin los rótulos incrustados).
// La cámara original ya se mueve; aquí solo un push-in sutil y un grading común para
// unificar Arezzo, Sienna y roble claro.
export const RealFloorCut: React.FC<Props> = ({ src, offsetSec = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = 1.02 + (frame / fps) * 0.04;

  return (
    <AbsoluteFill style={{ backgroundColor: "#1A120D", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          filter: "contrast(1.06) saturate(1.04) sepia(0.06) brightness(1.01)",
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
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 50%, rgba(26,18,13,0) 55%, rgba(26,18,13,0.28) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
