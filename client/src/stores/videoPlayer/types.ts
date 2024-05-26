import { OnProgressProps } from "react-player/base";
import { VideoInfoType } from "./../../../../common/types";

export interface VideoPlayerState {
  isLocallyPlaying: boolean;
  isServerPlaying: boolean;
  currentPlayingVideo: VideoInfoType | null;
  playedSeconds: number;
  volume: number;
  muted: boolean;
  queue: VideoInfoType[];
  playerProgress: OnProgressProps;
}

export interface VideoPlayerMethods {
  setIsLocallyPlaying: (value: boolean) => void;
  setIsServerPlaying: (value: boolean) => void;
  setCurrentPlayingVideo: (video: VideoInfoType) => void;
  setPlayedSeconds: (seconds: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setQueue: (queue: VideoInfoType[]) => void;
  addVideoToQueue: (video: VideoInfoType) => void;
  removeVideoFromQueue: (video: VideoInfoType) => void;
  setPlayerProgress: (progress: OnProgressProps) => void;
}
