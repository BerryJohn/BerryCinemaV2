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
    set({ currentPlayingVideo: queue[0] });
  },
  addVideoToQueue: (video: VideoInfoType) => {
    set({ queue: [...get().queue, video] });
  },
  removeVideoFromQueue: (video: VideoInfoType) => {
    set({ queue: get().queue.filter((v: VideoInfoType) => v !== video) });
  },
  setPlayerProgress: (progress) => {
    set({ playerProgress: progress });
  },
});
