import { VideoPlayerState } from "./types";

export const videoPlayerInitialStates: VideoPlayerState = {
  isLocallyPlaying: false,
  isServerPlaying: false,
  currentPlayingVideo: null,
  playedSeconds: 0,
  volume: 0.5,
  muted: false,
  queue: [],
};
