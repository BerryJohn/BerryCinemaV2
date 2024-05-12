import { useCallback } from "react";
import socket from "./../../utils/socket";

const VideoSection = () => {
  const playVideo = useCallback(() => {
    socket.emit("play");
    console.log("play");
  }, []);

  const stopVideo = useCallback(() => {
    socket.emit("stop");
    console.log("stop");
  }, []);

  return (
    <div className="w-full h-screen bg-black border-zinc-800 border-1 border-b-0">
      <button onClick={playVideo}>play</button>
      <button onClick={stopVideo}>stop</button>
    </div>
  );
};

export default VideoSection;
