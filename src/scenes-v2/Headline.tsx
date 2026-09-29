import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, jost, SAFE } from "./theme";

const REVEAL = Easing.bezier(0.16, 1, 0.3, 1);

export type HeadlineLine = {
  text: string;
  // Frame local (relativo al inicio del bloque) en que entra la línea.
  at: number;
  size?: number;
  weight?: 400 | 500 | 600;
  // Tracking inicial → final (em), para "apretar" palabras cortas al entrar.
  trackFrom?: number;
  trackTo?: number;
};

type Props = {
  lines: HeadlineLine[];
  top: number;
  // Etiqueta pequeña sobre el titular (ej. "FICHA TÉCNICA — 01").
  tag?: { text: string; at: number };
  // Línea secundaria bajo el titular.
  caption?: { text: string; at: number };
  // Frames que ya lleva "entrada" la primera línea en el frame 0 (para que el frame 1 no esté vacío).
  preroll?: number;
};

// Titular en máscara: cada línea sube desde abajo de su propio recorte, en el beat.
export const Headline: React.FC<Props> = ({
  lines,
  top,
  tag,
  caption,
  preroll = 0,
}) => {
  const frame = useCurrentFrame() + preroll;

  const reveal = (at: number, dur = 8) =>
    interpolate(frame, [at, at + dur], [0, 1], {
      easing: REVEAL,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          right: SAFE.right - 60,
          top,
          fontFamily: jost,
          color: colors.cream,
          textShadow: "0 6px 48px rgba(14,9,6,0.45)",
        }}
      >
        {tag ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 28,
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: "0.24em",
              opacity: reveal(tag.at, 6),
              color: colors.beige,
            }}
          >
            <div
              style={{
                height: 2,
                width: 64 * reveal(tag.at, 10),
                backgroundColor: colors.beige,
              }}
            />
            {tag.text}
          </div>
        ) : null}

        {lines.map((line) => {
          const p = reveal(line.at);
          const size = line.size ?? 128;
          const track = interpolate(
            reveal(line.at, 16),
            [0, 1],
            [line.trackFrom ?? 0.02, line.trackTo ?? 0.02],
          );
          return (
            <div
              key={line.text}
              style={{
                overflow: "hidden",
                // Margen para que acentos y descendentes no se corten con la máscara.
                paddingTop: size * 0.08,
                marginTop: -size * 0.08,
              }}
            >
              <div
                style={{
                  fontSize: size,
                  fontWeight: line.weight ?? 600,
                  lineHeight: 1,
                  letterSpacing: `${track}em`,
                  whiteSpace: "nowrap",
                  transform: `translateY(${(1 - p) * 110}%)`,
                }}
              >
                {line.text}
              </div>
            </div>
          );
        })}

        {caption ? (
          <div
            style={{
              marginTop: 34,
              fontSize: 36,
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: colors.beige,
              opacity: reveal(caption.at, 8),
              transform: `translateY(${(1 - reveal(caption.at, 10)) * 20}px)`,
            }}
          >
            {caption.text}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
