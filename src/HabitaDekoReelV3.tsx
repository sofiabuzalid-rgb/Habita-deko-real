import { AbsoluteFill, Composition, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { FloorCut } from "./scenes-v3/FloorCut";
import { Caption, Wordmark } from "./scenes-v3/Overlay";
import {
  beat,
  CLOSE_FROM,
  CUTS,
  DURATION_IN_FRAMES,
  FLASH_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
} from "./scenes-v3/timeline";

export const HabitaDekoReelV3Composition = () => {
  return (
    <Composition
      id="HabitaDekoReelV3"
      component={HabitaDekoReelV3}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

type Sfx = { name: string; src: string; at: number; peak: number; volume: number };

// Sound design discreto: la música manda; los SFX solo marcan ráfagas, drop y cierre.
const SFX: Sfx[] = [
  { name: "whoosh · entrada", src: "audio-v2/sfx_whoosh-short.mp3", at: 0, peak: 0, volume: 0.3 },
  ...FLASH_FRAMES.map((f, i) => ({
    name: `tic · flash ${i + 1}`,
    src: "audio-v2/sfx_click-tap.mp3",
    at: f,
    peak: 0,
    volume: 0.09,
  })),
  { name: "bass · drop", src: "audio-v2/sfx_bass-hit.mp3", at: beat(4), peak: 3, volume: 0.22 },
  { name: "whoosh · ráfaga 2", src: "audio-v2/sfx_whoosh-small.mp3", at: beat(20), peak: 9, volume: 0.3 },
  { name: "knock · cierre", src: "audio-v2/sfx_wood-knock.mp3", at: CLOSE_FROM, peak: 2, volume: 0.35 },
  { name: "bass · wordmark", src: "audio-v2/sfx_bass-hit.mp3", at: CLOSE_FROM, peak: 3, volume: 0.28 },
];

// Recreación del lenguaje visual del reel de referencia con pisos de madera:
// el piso ocupa todo el cuadro, un piso lleva al siguiente, cortes al ritmo de la música,
// texto mínimo y wordmark solo al cierre.
export const HabitaDekoReelV3: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#1A120D" }}>
      {CUTS.map((c, i) => (
        <Sequence
          key={`${c.from}-${c.src}`}
          name={c.src.replace("videos-v3/v3-", "")}
          from={c.from}
          durationInFrames={c.to - c.from}
          premountFor={15}
        >
          <FloorCut src={c.src} offsetSec={c.offsetSec} seed={i * 1.7} />
        </Sequence>
      ))}

      <Sequence name="Rótulo" durationInFrames={CLOSE_FROM}>
        <Caption until={CLOSE_FROM} />
      </Sequence>

      <Sequence name="Wordmark" from={CLOSE_FROM} durationInFrames={DURATION_IN_FRAMES - CLOSE_FROM}>
        <Wordmark />
      </Sequence>

      <Audio
        src={staticFile("audio-v3/music_loner_117-5bpm_from-14.31s.wav")}
        volume={(f) =>
          interpolate(f, [DURATION_IN_FRAMES - 22, DURATION_IN_FRAMES], [0.8, 0], {
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
