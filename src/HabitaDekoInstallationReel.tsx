import { AbsoluteFill, Composition, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { BandReveal, LogoSettle, Phrase, StageShot, Strip } from "./installation/Elements";
import {
  BAND_FROM,
  BAND_FULL,
  BAND_HOLD,
  BG,
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  LOGO_IN,
  REVEAL_FROM,
  REVEAL_SRC,
  STAGES,
  STRIP_COLOR_AT,
  STRIP_FIRST,
  STRIP_OUT_FROM,
  STRIP_STEP,
  STRIPS,
  STRIPS_END,
  TEXT_IN,
  TEXT_MORPH,
  TEXT_OUT,
  WIDTH,
} from "./installation/timeline";

export const HabitaDekoInstallationReelComposition = () => {
  return (
    <Composition
      id="HabitaDekoInstallationReel"
      component={HabitaDekoInstallationReel}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

type Sfx = { name: string; src: string; at: number; peak: number; volume: number };

// Sound design muy sutil: click de tablas y contacto de madera en algunos cortes, aire en la apertura.
const SFX: Sfx[] = [
  ...STRIPS.map((_, i) => ({
    name: `franja ${i + 1}`,
    src: "audio-v2/sfx_click-tap.mp3",
    at: STRIP_FIRST + i * STRIP_STEP,
    peak: 0,
    volume: 0.1,
  })),
  { name: "apertura", src: "audio-v2/sfx_air-whoosh.mp3", at: BAND_FROM + 8, peak: 21, volume: 0.18 },
  { name: "click · primeras tablas", src: "audio-v2/sfx_click-lock.mp3", at: STAGES[1].from, peak: 3, volume: 0.35 },
  { name: "click · filas", src: "audio-v2/sfx_click-lock.mp3", at: STAGES[2].from, peak: 3, volume: 0.3 },
  { name: "madera · colocando", src: "audio-v2/sfx_wood-knock.mp3", at: STAGES[3].from, peak: 2, volume: 0.28 },
  { name: "click · avanzando", src: "audio-v2/sfx_click-lock.mp3", at: STAGES[4].from, peak: 3, volume: 0.3 },
  { name: "click · casi", src: "audio-v2/sfx_click-lock.mp3", at: STAGES[5].from, peak: 3, volume: 0.25 },
  { name: "madera · unión", src: "audio-v2/sfx_wood-knock.mp3", at: STAGES[7].from, peak: 2, volume: 0.3 },
  { name: "reveal", src: "audio-v2/sfx_air-whoosh.mp3", at: REVEAL_FROM, peak: 21, volume: 0.16 },
  { name: "logo", src: "audio-v2/sfx_bass-hit.mp3", at: LOGO_IN, peak: 3, volume: 0.18 },
];

// El piso se forma delante de nosotros: del concreto desnudo al espacio Habita Deko terminado,
// usando solo el proceso real de instalación de los videos del cliente.
export const HabitaDekoInstallationReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* 1) Franjas del proceso */}
      {STRIPS.map((src, i) => {
        const from = STRIP_FIRST + i * STRIP_STEP;
        return (
          <Sequence key={src} name={`Franja ${i + 1}`} from={from} durationInFrames={STRIPS_END - from}>
            <Strip
              src={src}
              top={i * 420}
              height={420}
              colorAt={STRIP_COLOR_AT - from}
              outFrom={STRIP_OUT_FROM + i * 4 - from}
            />
          </Sequence>
        );
      })}

      {/* 3–4) Apertura + progresión de la instalación */}
      <Sequence name="Progresión" from={BAND_FROM} durationInFrames={REVEAL_FROM - BAND_FROM}>
        <BandReveal holdAt={BAND_HOLD - BAND_FROM} fullAt={BAND_FULL - BAND_FROM}>
          {STAGES.map((s) => (
            <Sequence
              key={s.src + s.from}
              name={s.src.replace("videos-installation/", "")}
              from={s.from - BAND_FROM}
              durationInFrames={s.to - s.from}
              premountFor={15}
            >
              <StageShot src={s.src} offsetSec={s.offsetSec} />
            </Sequence>
          ))}
        </BandReveal>
      </Sequence>

      {/* 5) Reveal del espacio terminado */}
      <Sequence name="Reveal · Arezzo terminado" from={REVEAL_FROM} premountFor={15}>
        <StageShot src={REVEAL_SRC} push={0.025} />
      </Sequence>

      {/* 2) Frase: permanece mientras el piso toma forma */}
      <Sequence name="Frase" from={TEXT_IN} durationInFrames={TEXT_OUT - TEXT_IN}>
        <Phrase morphAt={TEXT_MORPH - TEXT_IN} outAt={TEXT_OUT - TEXT_IN} videoAt={BAND_FROM - TEXT_IN} />
      </Sequence>

      <Sequence name="Logo" from={LOGO_IN}>
        <LogoSettle />
      </Sequence>

      <Audio
        src={staticFile("audio-installation/music_thinking-about-you_70bpm_from-15.87s.wav")}
        volume={(f) =>
          interpolate(f, [0, 12, DURATION_IN_FRAMES - 30, DURATION_IN_FRAMES], [0, 0.85, 0.85, 0], {
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
