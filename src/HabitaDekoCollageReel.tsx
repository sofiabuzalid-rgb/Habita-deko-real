import { AbsoluteFill, Composition, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Closing, CollageCard, WordCard } from "./collage/Elements";
import {
  CARDS,
  CLOSE_FROM,
  COLLAGE_FROM,
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  SUBTITLE_AT,
  WIDTH,
  WORDS,
} from "./collage/timeline";

export const HabitaDekoCollageReelComposition = () => {
  return (
    <Composition
      id="HabitaDekoCollageReel"
      component={HabitaDekoCollageReel}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

type Sfx = { name: string; src: string; at: number; peak: number; volume: number };

const A = (f: string) => `audio-collage/${f}`;

// Cada palabra y cada tarjeta tienen su sonido: click nítido para palabras, pop suave al entrar
// una tarjeta, click apagado al salir, y un golpe cálido en el logo.
const SFX: Sfx[] = [
  ...WORDS.map((w) => ({ name: `palabra · ${w.text}`, src: A("sfx_word-click.mp3"), at: w.at, peak: 0, volume: 0.35 })),
  ...CARDS.map((c, i) => ({ name: `entra tarjeta ${i + 1}`, src: A("sfx_card-pop.mp3"), at: c.inAt, peak: 3, volume: 0.6 })),
  ...CARDS.slice(1).map((c, i) => ({
    name: `sale tarjeta ${i + 2}`,
    src: A("sfx_card-out.mp3"),
    at: c.outAt,
    peak: 3,
    volume: 0.55,
  })),
  { name: "logo · golpe", src: "audio-v2/sfx_bass-hit.mp3", at: CLOSE_FROM, peak: 3, volume: 0.3 },
  { name: "logo · madera", src: "audio-v2/sfx_wood-knock.mp3", at: CLOSE_FROM, peak: 2, volume: 0.3 },
  { name: "subtítulo", src: A("sfx_word-click.mp3"), at: SUBTITLE_AT, peak: 0, volume: 0.3 },
];

// Reel nuevo inspirado en la estructura del segundo reel de referencia (palabras → collage → cierre),
// hecho solo con videos reales de pisos Habita Deko.
export const HabitaDekoCollageReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {WORDS.map((w, i) => {
        const to = i < WORDS.length - 1 ? WORDS[i + 1].at : COLLAGE_FROM;
        return (
          <Sequence key={w.text} name={`Palabra · ${w.text}`} from={w.at} durationInFrames={to - w.at}>
            <WordCard text={w.text} color={w.color} />
          </Sequence>
        );
      })}

      {CARDS.map((c, i) => (
        <Sequence
          key={c.src}
          name={`Tarjeta ${i + 1}`}
          from={c.inAt}
          durationInFrames={c.outAt - c.inAt}
          premountFor={10}
        >
          <CollageCard src={c.src} x={c.x} y={c.y} w={c.w} h={c.h} />
        </Sequence>
      ))}

      <Sequence name="Cierre · logo" from={CLOSE_FROM} durationInFrames={DURATION_IN_FRAMES - CLOSE_FROM}>
        <Closing subtitleAt={SUBTITLE_AT - CLOSE_FROM} />
      </Sequence>

      <Audio
        src={staticFile(A("music_cat-walk_130bpm_from-25.16s.wav"))}
        volume={(f) =>
          interpolate(f, [DURATION_IN_FRAMES - 25, DURATION_IN_FRAMES], [0.75, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {SFX.map((s) => (
        <Sequence key={s.name} name={`SFX · ${s.name}`} from={Math.max(0, s.at - s.peak)}>
          <Audio src={staticFile(s.src)} volume={() => s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
