import { useCallback, useEffect, useMemo } from "react";
import useVideoPlayerStore from "./../../../stores/videoPlayer/store";
import { secondsToHms } from "./../../../utils/helpers";
import socket from ".././../../utils/socket";

const Playlist = () => {
  const queue = useVideoPlayerStore((state) => state.queue);
  const setQueue = useVideoPlayerStore((state) => state.setQueue);

  const queueDuration = useMemo((): string => {
    const seconds = queue.reduce((acc, video) => {
      return acc + video.video.duration;
    }, 0);
    return secondsToHms(seconds);
  }, [queue]);

  const removeVideo = useCallback((videoId: string) => {
    console.log(videoId);
    socket.emit("removeVideo", videoId);
  }, []);

  useEffect(() => {
    socket.on("queueUpdate", (queue) => {
      setQueue(queue);
    });
    return () => {
      socket.off("queueUpdate");
    };
  }, [setQueue]);

  return (
    <div className="border-red-900 border col-span-2 col-start-1">
      <div className="flex items-center gap-2">
        <span className="text-4xl">Playlist</span>
        <div className="divide-y divide-gray-400 " />
        <span className="text-xl">{queue.length}</span>
        <span className="text-xl">{queueDuration}</span>
      </div>
      <div className="flex-col gap-4">
        {queue.map((video) => (
          <div
            className="border-red-900 border h-12"
            key={`video_playlist_${video.id}`}
          >
            <span>{video.title}</span> <br />
            <span>{video.id}</span>
            <button
              onClick={() => {
                removeVideo(video.id ?? "");
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
