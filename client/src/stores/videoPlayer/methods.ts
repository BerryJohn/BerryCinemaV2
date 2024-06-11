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
    set({ playedSeconds: 0 });
  },
  setPlayedSeconds: (seconds: number) => {
    set({ playedSeconds: seconds });
  },
  setVolume: (volume: number) => {
    set({ volume: volume });
    set({ muted: false });
  },
  setMuted: (muted: boolean) => {
    set({ muted: muted });
    console.log("test");
    if (get().isFirstTimeMuted) {
      console.log("test2");
      set({ isFirstTimeMuted: false });
      const volume = localStorage.getItem("volume")
        ? parseFloat(localStorage.getItem("volume")!)
        : 50;
      set({ volume: volume });
      return;
    }
    console.log("test3");

    if (muted) {
      localStorage.setItem("volumeBeforeMute", get().volume.toString());
      set({ volume: 0 });
    } else {
      const savedVolume = parseFloat(
        localStorage.getItem("volumeBeforeMute") ?? "50",
      );
      set({ volume: savedVolume });
    }
  },
  setQueue: (queue: VideoInfoType[]) => {
    set({ queue: queue });
    if (queue.length > 0) {
      set({ currentPlayingVideo: queue[0] });
    } else {
      set({ currentPlayingVideo: null });
      set({ playedSeconds: 0 });
    }
  },
  setPlayerProgress: (progress) => {
    set({ playerProgress: progress });
  },
  setIsFullScreen: (value: boolean) => {
    set({ isFullScreen: value });
  },
  setIsFirstTimeMuted(value) {
    set({ isFirstTimeMuted: value });
  },
});
