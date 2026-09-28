import { loadFont as loadSans } from "@remotion/google-fonts/Jost";
import { loadFont as loadSerif } from "@remotion/google-fonts/CormorantGaramond";

// Brand wordmark, product/technical copy: geometric, minimal, wide tracking.
export const { fontFamily: sansFont } = loadSans("normal", {
  weights: ["300", "400", "500"],
  subsets: ["latin"],
});

// Editorial narrative lines only, per creative direction: light italic serif.
export const { fontFamily: serifFont } = loadSerif("italic", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});
