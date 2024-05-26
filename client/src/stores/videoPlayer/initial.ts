import { VideoPlayerState } from "./types";

export const videoPlayerInitialStates: VideoPlayerState = {
  isLocallyPlaying: false,
  isServerPlaying: false,
  currentPlayingVideo: null,
  playedSeconds: 0,
  volume: localStorage.getItem("volume")
    ? parseFloat(localStorage.getItem("volume")!)
    : 0,
  muted: false,
  queue: [],
  playerProgress: { played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0 },
};
