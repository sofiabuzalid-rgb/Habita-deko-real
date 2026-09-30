import { AbsoluteFill, Composition, Img, interpolate, Sequence, staticFile } from "remotion";
import { Audio, Video } from "@remotion/media";
import { BOARDS } from "./plank-build/boards";
import { ENTER_FRAMES, Logo, PlankPiece, Phrase, Underlay } from "./plank-build/Elements";

const FPS = 30;
// Música: "Thinking About You" (Mixkit), 70 BPM → 1 beat ≈ 25.7 frames: una tabla por beat.
const BEAT = (FPS * 60) / 70;
const beat = (n: number) => Math.round(n * BEAT);

const DURATION = 420; // 14s

// Orden de instalación: fila por fila (de izquierda a derecha); dentro de cada fila, tabla tras tabla
// (Z2 queda fuera del encuadre, así que no se anima: ya está en el fotograma real del reveal).
// del fondo hacia la cámara. La primera tabla de cada fila nueva entra en ángulo (click del canto largo).
const ORDER = ["Z1", "A1", "A2", "B1", "B2", "B3", "C1", "C2"];
const LANE_STARTS = new Set(["A1", "B1", "C1"]);
const PLACEMENTS = ORDER.map((id, k) => {
  const board = BOARDS.find((b) => b.id === id)!;
  const start = beat(1 + k) - 10;
  return { board, start, land: start + ENTER_FRAMES, angleIn: LANE_STARTS.has(id) };
});

const REVEAL_FROM = beat(10.5); // todas las tablas asentadas → el fotograma real empieza a moverse
const REVEAL_LEN = 104; // clip de 3.47s
const LOGO_IN = REVEAL_FROM + 50;

export const HabitaDekoPlankBuildReelComposition = () => (
  <Composition
    id="HabitaDekoPlankBuildReel"
    component={HabitaDekoPlankBuildReel}
    durationInFrames={DURATION}
    fps={FPS}
    width={1080}
    height={1920}
  />
);

type Sfx = { name: string; src: string; at: number; peak: number; volume: number };
const SFX: Sfx[] = [
  ...PLACEMENTS.map((p) => ({
    name: `click · ${p.board.id}`,
    src: "audio-v2/sfx_click-lock.mp3",
    at: p.land,
    peak: 3,
    volume: p.angleIn ? 0.5 : 0.42,
  })),
  ...PLACEMENTS.filter((p) => p.angleIn).map((p) => ({
    name: `madera · ${p.board.id}`,
    src: "audio-v2/sfx_wood-knock.mp3",
    at: p.land,
    peak: 2,
    volume: 0.22,
  })),
  { name: "reveal", src: "audio-v2/sfx_air-whoosh.mp3", at: REVEAL_FROM + 6, peak: 21, volume: 0.15 },
  { name: "logo", src: "audio-v2/sfx_bass-hit.mp3", at: LOGO_IN, peak: 3, volume: 0.16 },
];

// El piso Habita Deko se "instala" tabla por tabla con piezas recortadas del propio fotograma real,
// y al completarse el fotograma cobra vida: es el video original, que retrocede y revela la habitación.
export const HabitaDekoPlankBuildReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#C9C0B4" }}>
      <Sequence name="Subsuelo + tablas" durationInFrames={REVEAL_FROM + 2}>
        <Underlay />
        {PLACEMENTS.map((p) => (
          <Sequence key={p.board.id} name={`Tabla ${p.board.id}`} from={p.start}>
            <PlankPiece board={p.board} angleIn={p.angleIn} />
          </Sequence>
        ))}
      </Sequence>

      {/* Reveal: el primer fotograma del video es exactamente el fotograma armado con las tablas */}
      <Sequence name="Video real · reveal" from={REVEAL_FROM} durationInFrames={REVEAL_LEN} premountFor={20}>
        <Video
          src={staticFile("videos-planks/reveal_sienna-pullback.mp4")}
          style={{ width: "100%", height: "100%" }}
          objectFit="cover"
          muted
        />
      </Sequence>
      <Sequence name="Último fotograma" from={REVEAL_FROM + REVEAL_LEN - 1}>
        <Img src={staticFile("videos-planks/reveal_last-frame.png")} style={{ width: 1080, height: 1920 }} />
      </Sequence>

      <Sequence name="Frase" from={8} durationInFrames={REVEAL_FROM + 12 - 8}>
        <Phrase outAt={REVEAL_FROM + 12 - 8} />
      </Sequence>

      <Sequence name="Logo" from={LOGO_IN}>
        <Logo />
      </Sequence>

      <Audio
        src={staticFile("audio-installation/music_thinking-about-you_70bpm_from-15.87s.wav")}
        volume={(f) =>
          interpolate(f, [0, 12, DURATION - 30, DURATION], [0, 0.8, 0.8, 0], {
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
