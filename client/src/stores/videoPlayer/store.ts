import { create } from "zustand";
import { VideoPlayerMethods, VideoPlayerState } from "./types";
import { videoPlayerInitialStates } from "./initial";
import { videoPlayerMethods } from "./methods";
import { devtools } from "zustand/middleware";

const useVideoPlayerStore = create<VideoPlayerState & VideoPlayerMethods>()(
  devtools((set, get) => ({
    ...videoPlayerInitialStates,
    ...videoPlayerMethods(set, get),
  })),
);

export default useVideoPlayerStore;
