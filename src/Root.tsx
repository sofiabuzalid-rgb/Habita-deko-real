import "./index.css";
import { Composition, Folder } from "remotion";
import { HabitaDekoReelComposition } from "./HabitaDekoReel";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Tactile } from "./scenes/Scene2Tactile";
import { Scene3Reveal } from "./scenes/Scene3Reveal";
import { Scene4aWaterproof } from "./scenes/Scene4aWaterproof";
import { Scene4bClick } from "./scenes/Scene4bClick";
import { Scene4cAcoustic } from "./scenes/Scene4cAcoustic";
import { Scene5Lifestyle } from "./scenes/Scene5Lifestyle";
import { Scene6Closing } from "./scenes/Scene6Closing";
import { HabitaDekoReelV2Composition } from "./HabitaDekoReelV2";
import { HabitaDekoReelV3Composition } from "./HabitaDekoReelV3";
import { HabitaDekoReelV4Composition } from "./HabitaDekoReelV4";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <HabitaDekoReelComposition />
      <HabitaDekoReelV2Composition />
      <HabitaDekoReelV3Composition />
      <HabitaDekoReelV4Composition />
      <Folder name="HabitaDekoReel-Scenes">
        <Composition
          id="Scene1-Opening"
          component={Scene1Opening}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={84}
        />
        <Composition
          id="Scene2-Tactile"
          component={Scene2Tactile}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={60}
        />
        <Composition
          id="Scene3-Reveal"
          component={Scene3Reveal}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={45}
        />
        <Composition
          id="Scene4a-Waterproof"
          component={Scene4aWaterproof}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={37}
        />
        <Composition
          id="Scene4b-Click"
          component={Scene4bClick}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={37}
        />
        <Composition
          id="Scene4c-Acoustic"
          component={Scene4cAcoustic}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={55}
        />
        <Composition
          id="Scene5-Lifestyle"
          component={Scene5Lifestyle}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={125}
        />
        <Composition
          id="Scene6-Closing"
          component={Scene6Closing}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={90}
        />
      </Folder>
    </>
  );
};
