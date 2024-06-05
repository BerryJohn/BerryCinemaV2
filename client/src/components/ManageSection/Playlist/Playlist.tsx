import { useCallback, useEffect, useMemo } from "react";
import useVideoPlayerStore from "./../../../stores/videoPlayer/store";
import { secondsToHms } from "./../../../utils/helpers";
import socket from ".././../../utils/socket";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import PlaylistElement from "./PlaylistElement";

const Playlist = () => {
  const queue = useVideoPlayerStore((state) => state.queue);
  const setQueue = useVideoPlayerStore((state) => state.setQueue);

  const queueDuration = useMemo((): string => {
    const seconds = queue.reduce((acc, video) => {
      return acc + video.video.duration;
    }, 0);
    return secondsToHms(seconds);
  }, [queue]);

  useEffect(() => {
    socket.on("queueUpdate", (queue) => {
      setQueue(queue);
    });
    return () => {
      socket.off("queueUpdate");
    };
  }, [setQueue]);

  return (
    <div className="col-span-2 col-start-1 p-1 px-4">
      <div className="flex items-end gap-4">
        <span className="text-4xl">Playlist</span>
        <div className="divide-y divide-gray-400 " />
        <span className="text-xl flex justify-center items-center gap-2">
          <FaRegListAlt />
          {queue.length}
        </span>
        <span className="text-xl flex justify-center items-center gap-2">
          <FaRegClock />
          {queueDuration}
        </span>
      </div>
      <div className="flex flex-col gap-4 my-6">
        {queue.map((video, index) => (
          <PlaylistElement
            key={`video_playlist_${video.id}`}
            video={video}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
