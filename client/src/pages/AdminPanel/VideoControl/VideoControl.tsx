import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";
import socket from "@Berry/utils/socket";
import { useEffect } from "react";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";

const playServerVideo = () => {
  socket.emit("play");
};

const stopServerVideo = () => {
  socket.emit("stop");
};

const VideoControl = () => {
  const isServerPlaying = useVideoPlayerStore((store) => store.isServerPlaying);
  const setIsServerPlaying = useVideoPlayerStore(
    (store) => store.setIsServerPlaying,
  );
  const setQueue = useVideoPlayerStore((store) => store.setQueue);
  const currentPlayingVideo = useVideoPlayerStore(
    (store) => store.currentPlayingVideo,
  );

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

  useEffect(() => {
    socket.on("queueUpdate", (queue) => {
      setQueue(queue);
    });
    return () => {
      socket.off("queueUpdate");
    };
  }, [setQueue]);

  return (
    <div>
      Video is currently{" "}
      <span className="font-bold text-indigo-500">
        {isServerPlaying ? "playing" : "paused"}
      </span>{" "}
      on server
      <br />
      {currentPlayingVideo ? (
        <div className="flex flex-col border border-slate-700 p-2">
          <span> Current playing video: ID: {currentPlayingVideo.id}</span>
          <span> Title: {currentPlayingVideo.title}</span>
          <span> Description: {currentPlayingVideo.description}</span>
          <span> isPlaying: {currentPlayingVideo.isPlaying}</span>
          <span> Duration: {currentPlayingVideo.video.duration}</span>
          <span> URL: {currentPlayingVideo.video.url}</span>
        </div>
      ) : (
        <>No video is currently playing</>
      )}
      <div className="flex gap-2">
        <button
          className={`text-lg flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800  rounded-md px-2 py-1 h-12 duration-100 active:bg-slate-600
          ${isServerPlaying ? "bg-indigo-900 cursor-not-allowed" : ""}`}
          onClick={playServerVideo}
          disabled={isServerPlaying}
        >
          Play <TbPlayerPlayFilled />
        </button>
        <button
          className={`text-lg flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800  rounded-md px-2 py-1 h-12 duration-100 active:bg-slate-600
          ${isServerPlaying ? "" : "bg-indigo-900 cursor-not-allowed"}`}
          onClick={stopServerVideo}
          disabled={!isServerPlaying}
        >
          Pause <TbPlayerPauseFilled />
        </button>
      </div>
      <div className="flex flex-col">
        <span>FAQ:</span>
        <span>Q: i can't play the video</span>
        <span>A: make sure that the video is added to the server queue</span>
      </div>
    </div>
  );
};

export default VideoControl;
