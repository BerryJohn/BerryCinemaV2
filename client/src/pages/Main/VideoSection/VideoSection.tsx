import { useEffect, useRef } from "react";
import socket from "@Berry/utils/socket";
import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";
import ReactPlayer from "react-player";
import Controls from "./Controls";
import FullScreen from "react-fullscreen-crossbrowser";

const VideoSection = () => {
  const videoPlayerRef = useRef<ReactPlayer>(null);

  const isFullScreen = useVideoPlayerStore((store) => store.isFullScreen);
  const isLocallyPlaying = useVideoPlayerStore(
    (store) => store.isLocallyPlaying,
  );
  const isServerPlaying = useVideoPlayerStore((store) => store.isServerPlaying);

  const setPlayerProgress = useVideoPlayerStore(
    (store) => store.setPlayerProgress,
  );

  const volume = useVideoPlayerStore((store) => store.volume);
  const currentPlayingVideo = useVideoPlayerStore(
    (store) => store.currentPlayingVideo,
  );

  useEffect(() => {
    socket.on("currentVideoTime", (time: number) => {
      videoPlayerRef.current?.seekTo(time, "seconds");
    });
  }, [videoPlayerRef]);

  return (
    <div className="w-full h-screen bg-black border-zinc-800 border-1 border-b-0 relative">
      <FullScreen enabled={isFullScreen}>
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          className=""
          volume={volume}
          url={currentPlayingVideo?.video?.url}
          playing={isServerPlaying && isLocallyPlaying}
          ref={videoPlayerRef}
          onProgress={(state) => {
            setPlayerProgress(state);
          }}
        />
        <Controls videoPlayerRef={videoPlayerRef} />
      </FullScreen>
    </div>
  );
};

export default VideoSection;
