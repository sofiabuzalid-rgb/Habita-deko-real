import { Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Tactile } from "./scenes/Scene2Tactile";
import { Scene3Reveal } from "./scenes/Scene3Reveal";
import { Scene4aWaterproof } from "./scenes/Scene4aWaterproof";
import { Scene4bClick } from "./scenes/Scene4bClick";
import { Scene4cAcoustic } from "./scenes/Scene4cAcoustic";
import { Scene5Lifestyle } from "./scenes/Scene5Lifestyle";
import { Scene6Closing } from "./scenes/Scene6Closing";

const FPS = 30;
const DURATION_IN_SECONDS = 16;

export const HabitaDekoReelComposition = () => {
  return (
    <Composition
      id="HabitaDekoReel"
      component={HabitaDekoReel}
      durationInFrames={DURATION_IN_SECONDS * FPS}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};

// Concepto: "Parece madera. No lo es. Y ahí está la diferencia."
// Estructura (duraciones ya incluyen los frames de solape de cada transición,
// de modo que el total dé exactamente 480 frames / 16s):
//   1. Opening (0:00–0:02.3)      "Parece madera."
//   -- fade 15f --
//   2. Tactile (0:02.3–0:04.3)    "Se siente como madera."
//   -- corte duro --
//   3. Reveal (0:04.3–0:05.8)     "Pero no lo es."
//   -- corte duro --
//   4a. Waterproof                "100% resistente al agua."
//   -- corte duro --
//   4b. Click                     "Unilin Click."
//   -- corte duro --
//   4c. Acoustic (…–0:09.5)       "Base acústica integrada."
//   -- fade 18f --
//   5. Lifestyle (0:09.5–0:13.0)  "Diseñado para la vida real."
//   -- fade 20f --
//   6. Closing (0:13.0–0:16.0)    Wordmark + tagline + colección
export const HabitaDekoReel: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="1. Opening" durationInFrames={84}>
        <Scene1Opening />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence name="2. Tactile" durationInFrames={60}>
        <Scene2Tactile />
      </TransitionSeries.Sequence>

      <TransitionSeries.Sequence name="3. Reveal" durationInFrames={45}>
        <Scene3Reveal />
      </TransitionSeries.Sequence>

      <TransitionSeries.Sequence name="4a. Waterproof" durationInFrames={37}>
        <Scene4aWaterproof />
      </TransitionSeries.Sequence>

      <TransitionSeries.Sequence name="4b. Click" durationInFrames={37}>
        <Scene4bClick />
      </TransitionSeries.Sequence>

      <TransitionSeries.Sequence name="4c. Acoustic" durationInFrames={55}>
        <Scene4cAcoustic />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 18 })}
      />

      <TransitionSeries.Sequence name="5. Lifestyle" durationInFrames={125}>
        <Scene5Lifestyle />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      <TransitionSeries.Sequence name="6. Closing" durationInFrames={90}>
        <Scene6Closing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
