import { useEffect, useRef } from "react";
import socket from "./../../utils/socket";
import useVideoPlayerStore from "./../../stores/videoPlayer/store";
import ReactPlayer from "react-player";
import Controls from "./Controls";

const VideoSection = () => {
  const videoPlayerRef = useRef<ReactPlayer>(null);

  const isLocallyPlaying = useVideoPlayerStore(
    (store) => store.isLocallyPlaying,
  );
  const isServerPlaying = useVideoPlayerStore((store) => store.isServerPlaying);
  const setIsServerPlaying = useVideoPlayerStore(
    (store) => store.setIsServerPlaying,
  );
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
      console.log("sync");
    });
  }, [videoPlayerRef]);

  useEffect(() => {
    socket.on("videoPlayed", () => {
      setIsServerPlaying(true);
    });

    socket.on("videoStopped", () => {
      setIsServerPlaying(false);
    });

    return () => {
      socket.off("videoPlayed");
      socket.off("videoStopped");
    };
  }, [setIsServerPlaying]);

  return (
    <div className="w-full h-screen bg-black border-zinc-800 border-1 border-b-0 relative">
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
    </div>
  );
};

export default VideoSection;
