import { Composition } from "remotion";

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

export const HabitaDekoReel: React.FC = () => {
  // Placeholder: sin assets ni diseño todavía.
  // Se completará con videos, logo, tipografías y dirección creativa de Habita Deko.
  return null;
};
