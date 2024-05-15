import { useCallback, useEffect } from "react";
import socket from "./../../utils/socket";
import useVideoPlayerStore from "./../../stores/videoPlayer/store";

const playServerVideo = () => {
  socket.emit("play");
};

const stopServerVideo = () => {
  socket.emit("stop");
};

const VideoSection = () => {
  const isLocallyPlaying = useVideoPlayerStore(
    (store) => store.isLocallyPlaying,
  );
  const isServerPlaying = useVideoPlayerStore((store) => store.isServerPlaying);
  const setIsServerPlaying = useVideoPlayerStore(
    (store) => store.setIsServerPlaying,
  );
  const setIsLocallyPlaying = useVideoPlayerStore(
    (store) => store.setIsLocallyPlaying,
  );

  const currentPlayingVideo = useVideoPlayerStore(
    (store) => store.currentPlayingVideo,
  );

  const volume = useVideoPlayerStore((store) => store.volume);
  const muted = useVideoPlayerStore((store) => store.muted);
  const playedSeconds = useVideoPlayerStore((store) => store.playedSeconds);

  const playVideo = useCallback(() => {
    setIsLocallyPlaying(true);
  }, [setIsLocallyPlaying]);

  const stopVideo = useCallback(() => {
    setIsLocallyPlaying(false);
  }, [setIsLocallyPlaying]);

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
  }, []);

  return (
    <div className="w-full h-screen bg-black border-zinc-800 border-1 border-b-0">
      <div className="flex-col">
        <span>Local Video Player</span>
        <div>
          <button onClick={playVideo}>play</button>
          <button onClick={stopVideo}>stop</button>
        </div>
        <div>isLocallyPlaying: {isLocallyPlaying.toString()}</div>
      </div>
      <br />
      <div className="flex-col">
        <span>Server Video Player</span>
        <div>
          <button onClick={playServerVideo}>play</button>
          <button onClick={stopServerVideo}>stop</button>
        </div>
        <div>isServerPlaying: {isServerPlaying.toString()}</div>
      </div>
      Volume: {volume} {"  "} Muted: {muted.toString()}
      <br />
      Played Seconds: {playedSeconds}
      <br />
      {JSON.stringify(currentPlayingVideo)}
    </div>
  );
};

export default VideoSection;
