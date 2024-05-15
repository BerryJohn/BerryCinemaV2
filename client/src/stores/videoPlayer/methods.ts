import { VideoInfoType } from "./../../../../common/types";
import { VideoPlayerMethods } from "./types";

export const videoPlayerMethods = (set, get): VideoPlayerMethods => ({
  setIsLocallyPlaying: (value: boolean) => {
    set({ isLocallyPlaying: value });
  },
  setIsServerPlaying: (value: boolean) => {
    set({ isServerPlaying: value });
  },
  setCurrentPlayingVideo: (video: VideoInfoType) => {
    set({ currentPlayingVideo: video });
  },
  setPlayedSeconds: (seconds: number) => {
    set({ playedSeconds: seconds });
  },
  setVolume: (volume: number) => {
    set({ volume: volume });
  },
  setMuted: (muted: boolean) => {
    set({ muted: muted });
  },
  setQueue: (queue: VideoInfoType[]) => {
    set({ queue: queue });
  },
  addVideoToQueue: (video: VideoInfoType) => {
    set({ queue: [...get().queue, video] });
  },
  removeVideoFromQueue: (video: VideoInfoType) => {
    set({ queue: get().queue.filter((v: VideoInfoType) => v !== video) });
  },
});
