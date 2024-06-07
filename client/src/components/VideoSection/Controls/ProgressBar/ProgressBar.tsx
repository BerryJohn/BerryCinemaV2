import useVideoPlayerStore from "./../../../../stores/videoPlayer/store";
import ProgressBarProps from "./types";

const ProgressBar = ({ videoPlayerRef }: ProgressBarProps) => {
  const playerProgress = useVideoPlayerStore((store) => store.playerProgress);
  const currentPlayingVideo = useVideoPlayerStore(
    (store) => store.currentPlayingVideo,
  );

  return (
    <input
      type="range"
      min="0"
      max={currentPlayingVideo?.video.duration ?? 0}
      value={playerProgress.playedSeconds}
      onChange={(e) => videoPlayerRef.current?.seekTo(Number(e.target.value))}
      className="w-full h-1 accent-indigo-500 hover:accent-indigo-500 focus:accent-indigo-600 cursor-pointer"
    />
  );
};

export default ProgressBar;
