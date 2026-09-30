import { AbsoluteFill, Composition, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Shot, ShotProps } from "./scenes-v2/Shot";
import { Headline, HeadlineLine } from "./scenes-v2/Headline";
import { ClickJoin } from "./scenes-v2/ClickJoin";
import { Closing } from "./scenes-v2/Closing";
import {
  beat,
  colors,
  DURATION_IN_FRAMES,
  FPS,
  grades,
  HEIGHT,
  WIDTH,
} from "./scenes-v2/theme";

export const HabitaDekoReelV2Composition = () => {
  return (
    <Composition
      id="HabitaDekoReelV2"
      component={HabitaDekoReelV2}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};

const V = {
  oak: "videos-v2/v2-01_oak-grain-macro_1440x1920.mp4",
  sanded: "videos-v2/v2-02_sanded-oak-surface-macro_1440x1920.mp4",
  walnut: "videos-v2/v2-03_dark-walnut-grain_1440x1920.mp4",
  glide: "videos-v2/v2-04_floor-level-glide-light_1440x1920.mp4",
  layered: "videos-v2/v2-05_layered-wood-macro_1080x1920.mp4",
  water: "videos-v2/v2-06_water-drop-macro_1440x1920.mp4",
} as const;

type ShotEntry = ShotProps & { from: number; to: number; name: string };

// Todos los cortes caen en beat (124 BPM → 1 beat ≈ 14.5 frames, 1 compás ≈ 58 frames).
const SHOTS: ShotEntry[] = [
  // Compás 1 — Hook: cuatro macros de madera, un corte por beat.
  { name: "Hook · roble macro", from: beat(0), to: beat(1), src: V.oak, srcWidth: 1440, startSec: 1, scale: [1.3, 1.18], grade: grades.warm },
  { name: "Hook · nogal oscuro", from: beat(1), to: beat(2), src: V.walnut, srcWidth: 1440, startSec: 2, scale: [1.12, 1.12], panX: [140, -40], grade: grades.warm },
  { name: "Hook · capas", from: beat(2), to: beat(3), src: V.layered, srcWidth: 1080, startSec: 1, scale: [1.1, 1.22], grade: grades.warm },
  { name: "Hook · superficie", from: beat(3), to: beat(4), src: V.sanded, srcWidth: 1440, startSec: 0.5, scale: [1.35, 1.2], grade: grades.warm },
  // Compás 2 — "Pero está hecho para mucho más": travelling a ras de piso hacia la luz.
  { name: "Más · travelling piso", from: beat(4), to: beat(6), src: V.glide, srcWidth: 1440, startSec: 0, playbackRate: 1.6, scale: [1.1, 1.25], grade: grades.warm, shade: 0.3 },
  { name: "Más · punch-in", from: beat(6), to: beat(8), src: V.glide, srcWidth: 1440, startSec: 3.2, playbackRate: 1.6, scale: [1.45, 1.6], panX: [0, -60], grade: grades.warm, shade: 0.3 },
  // Compás 3 — Agua (claim del catálogo; el clip es solo recurso gráfico).
  { name: "Agua · gota", from: beat(8), to: beat(12), src: V.water, srcWidth: 1440, startSec: 0.6, scale: [1.15, 1.0], grade: grades.waterMono, shade: 0.3 },
  // Compás 4 — EIR: textura protagonista.
  { name: "EIR · veta pan", from: beat(12), to: beat(14), src: V.oak, srcWidth: 1440, startSec: 3.5, scale: [1.15, 1.2], panX: [-170, 120], grade: grades.warm, shade: 0.3 },
  { name: "EIR · extremo macro", from: beat(14), to: beat(16), src: V.sanded, srcWidth: 1440, startSec: 2.5, scale: [1.7, 1.55], grade: grades.warm, shade: 0.3 },
  // Compás 6 — Vida real: el travelling llega al espacio habitado.
  { name: "Vida real · espacio", from: beat(20), to: beat(22), src: V.glide, srcWidth: 1440, startSec: 6, playbackRate: 1.3, scale: [1.05, 1.15], grade: grades.warm, shade: 0.32 },
  { name: "Vida real · detalle", from: beat(22), to: beat(24), src: V.glide, srcWidth: 1440, startSec: 8.5, playbackRate: 1.3, scale: [1.2, 1.3], panX: [60, -40], grade: grades.warm, shade: 0.32 },
];

type TextEntry = {
  name: string;
  from: number;
  to: number;
  top: number;
  lines: HeadlineLine[];
  tag?: { text: string; at: number };
  caption?: { text: string; at: number };
  preroll?: number;
};

// `at` en frames absolutos; se convierten a locales al renderizar.
const TEXTS: TextEntry[] = [
  {
    name: "Parece madera",
    from: beat(0),
    to: beat(4),
    top: 720,
    preroll: 4,
    lines: [
      { text: "PARECE", at: beat(0), size: 180 },
      { text: "MADERA.", at: beat(2), size: 180 },
    ],
  },
  {
    name: "Mucho más",
    from: beat(4),
    to: beat(8),
    top: 700,
    lines: [
      { text: "PERO ESTÁ", at: beat(4), size: 124 },
      { text: "HECHO PARA", at: beat(5), size: 124 },
      { text: "MUCHO MÁS.", at: beat(6), size: 124 },
    ],
  },
  {
    name: "100% resistente al agua",
    from: beat(8),
    to: beat(12),
    top: 560,
    tag: { text: "FICHA TÉCNICA — 01", at: beat(8) },
    lines: [
      { text: "100%", at: beat(8), size: 300, trackFrom: 0.14, trackTo: -0.02 },
      { text: "RESISTENTE", at: beat(9), size: 118 },
      { text: "AL AGUA", at: beat(10), size: 118 },
    ],
  },
  {
    name: "Tecnología EIR",
    from: beat(12),
    to: beat(16),
    top: 600,
    tag: { text: "FICHA TÉCNICA — 02", at: beat(12) },
    lines: [
      { text: "TECNOLOGÍA", at: beat(12), size: 118 },
      { text: "EIR", at: beat(13), size: 340, trackFrom: 0.2, trackTo: 0.02 },
    ],
    caption: { text: "EMBOSSED IN REGISTER", at: beat(14) },
  },
  {
    name: "Unilin Click",
    from: beat(16),
    to: beat(20),
    top: 640,
    tag: { text: "FICHA TÉCNICA — 03", at: beat(16) },
    lines: [
      { text: "UNILIN", at: beat(17), size: 200 },
      { text: "CLICK", at: beat(18), size: 200 },
    ],
    caption: { text: "SISTEMA DE ENSAMBLE", at: beat(19) },
  },
  {
    name: "Vida real",
    from: beat(20),
    to: beat(24),
    top: 700,
    lines: [
      { text: "DISEÑADO", at: beat(20), size: 132 },
      { text: "PARA LA", at: beat(21), size: 132 },
      { text: "VIDA REAL.", at: beat(22), size: 132 },
    ],
  },
];

type Sfx = { name: string; src: string; at: number; peak: number; volume: number };

// `peak` = frames desde el inicio del archivo hasta su transiente, para que el golpe caiga en beat.
const SFX: Sfx[] = [
  { name: "knock · PARECE", src: "sfx_wood-knock.mp3", at: beat(0), peak: 0, volume: 0.45 },
  { name: "knock · MADERA", src: "sfx_wood-knock.mp3", at: beat(2), peak: 2, volume: 0.45 },
  { name: "whoosh · mucho más", src: "sfx_whoosh-small.mp3", at: beat(4), peak: 9, volume: 0.35 },
  { name: "gota · agua", src: "sfx_water-drop.mp3", at: beat(8), peak: 4, volume: 0.9 },
  { name: "bass · 100%", src: "sfx_bass-hit.mp3", at: beat(8), peak: 3, volume: 0.2 },
  { name: "whoosh · EIR", src: "sfx_whoosh-short.mp3", at: beat(12), peak: 14, volume: 0.55 },
  { name: "tap · EIR", src: "sfx_click-tap.mp3", at: beat(13), peak: 0, volume: 0.25 },
  { name: "click · ensamble", src: "sfx_click-lock.mp3", at: beat(17), peak: 3, volume: 0.55 },
  { name: "knock · ensamble", src: "sfx_wood-knock.mp3", at: beat(17), peak: 2, volume: 0.35 },
  { name: "whoosh · vida real", src: "sfx_whoosh-small.mp3", at: beat(20), peak: 9, volume: 0.35 },
  { name: "air · cierre", src: "sfx_air-whoosh.mp3", at: beat(24), peak: 21, volume: 0.4 },
  { name: "bass · wordmark", src: "sfx_bass-hit.mp3", at: beat(24), peak: 3, volume: 0.35 },
  { name: "tap · tagline", src: "sfx_click-tap.mp3", at: beat(26), peak: 0, volume: 0.3 },
];

const MUSIC_FADE_START = DURATION_IN_FRAMES - 26;

// "Parece madera. Pero está hecho para mucho más." — ~14s, 7 compases a 124 BPM.
//   Compás 1  Hook macro (4 cortes)        PARECE / MADERA.
//   Compás 2  Travelling a ras de piso     PERO ESTÁ HECHO PARA MUCHO MÁS.
//   Compás 3  Gota macro (monocromo café)  100% RESISTENTE AL AGUA      (ficha 01)
//   Compás 4  Veta macro                   TECNOLOGÍA EIR               (ficha 02)
//   Compás 5  Ensamble de dos mitades      UNILIN CLICK                 (ficha 03)
//   Compás 6  Travelling al espacio        DISEÑADO PARA LA VIDA REAL.
//   Compás 7+ Haz de luz + wordmark        HABITA DEKO / LUJO A TU ALCANCE.
export const HabitaDekoReelV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      {SHOTS.map(({ from, to, name, ...shot }) => (
        <Sequence key={name} name={name} from={from} durationInFrames={to - from} premountFor={20}>
          <Shot {...shot} />
        </Sequence>
      ))}

      <Sequence name="Ensamble · Unilin Click" from={beat(16)} durationInFrames={beat(20) - beat(16)} premountFor={20}>
        <ClickJoin joinAt={beat(17) - beat(16)} />
      </Sequence>

      <Sequence name="Cierre" from={beat(24)} durationInFrames={DURATION_IN_FRAMES - beat(24)} premountFor={20}>
        <Closing taglineAt={beat(26) - beat(24)} collectionAt={beat(27) - beat(24)} />
      </Sequence>

      {TEXTS.map((t) => (
        <Sequence key={t.name} name={`Texto · ${t.name}`} from={t.from} durationInFrames={t.to - t.from}>
          <Headline
            top={t.top}
            preroll={t.preroll}
            lines={t.lines.map((l) => ({ ...l, at: l.at - t.from }))}
            tag={t.tag ? { ...t.tag, at: t.tag.at - t.from } : undefined}
            caption={t.caption ? { ...t.caption, at: t.caption.at - t.from } : undefined}
          />
        </Sequence>
      ))}

      <Audio
        src={staticFile("audio-v2/music_deep-urban_124bpm_from-15.49s.wav")}
        volume={(f) =>
          interpolate(f, [MUSIC_FADE_START, DURATION_IN_FRAMES], [0.72, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {SFX.map((s) => (
        <Sequence key={s.name} name={`SFX · ${s.name}`} from={Math.max(0, s.at - s.peak)}>
          <Audio src={staticFile(`audio-v2/${s.src}`)} volume={() => s.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
