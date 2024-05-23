type VideoData = {
  duration: number;
  url: string;
};

export type VideoInfoType = {
  id?: string;
  title: string;
  description: string;
  video: VideoData;
  isPlaying?: boolean;
};

export type HandshakeDataType = {
  isServerVideoPlaying: boolean;
  currentVideo: VideoInfoType;
  queue: VideoInfoType[];
  playedSeconds: number;
};
