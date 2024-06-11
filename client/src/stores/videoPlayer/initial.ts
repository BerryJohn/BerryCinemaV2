import { VideoPlayerState } from "./types";

export const videoPlayerInitialStates: VideoPlayerState = {
  isLocallyPlaying: true,
  isServerPlaying: false,
  currentPlayingVideo: null,
  playedSeconds: 0,
  // value has to be 0 to play the video (autoplay policy)
  volume: 0,
  muted: true,
  queue: [],
  playerProgress: { played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0 },
  isFullScreen: false,
  isFirstTimeMuted: true,
};
