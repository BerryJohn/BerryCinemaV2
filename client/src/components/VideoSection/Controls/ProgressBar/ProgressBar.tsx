import useVideoPlayerStore from "./../../../../stores/videoPlayer/store";

const ProgressBar = ({ videoPlayerRef }: ProgressBarProps) => {
  const playerProgress = useVideoPlayerStore((store) => store.playerProgress);
  const currentPlayingVideo = useVideoPlayerStore(
    (store) => store.currentPlayingVideo,
  );
  console.log(playerProgress);
  return (
    <input
      type="range"
      min="0"
      max={currentPlayingVideo?.video.duration ?? 0}
      value={playerProgress.playedSeconds}
      onChange={(e) => videoPlayerRef.current.seekTo(e.target.value)}
      className="w-full"
    />
    // <div className="h-3 w-full bg-black">
    //   {/* Loaded  */}
    //   <div
    //     className="h-full w-1/2 bg-purple-700"
    //     style={{
    //       width: `${playerProgress.loaded * 100}%`,
    //       transition: "width 0.1s",
    //     }}
    //   >
    //     {/* Viewed */}
    //     <div
    //       className="h-full w-1/6 bg-orange-500"
    //       style={{
    //         width: `${playerProgress.played * 100}%`,
    //         transition: "width 0.1s",
    //       }}
    //     ></div>
    //   </div>
    // </div>
  );
};

export default ProgressBar;
