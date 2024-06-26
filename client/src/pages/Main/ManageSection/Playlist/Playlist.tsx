import { useEffect, useMemo } from "react";
import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";
import { secondsToHms } from "@Berry/utils/helpers";
import socket from "@Berry/utils/socket";
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
        {queue.length === 0 && (
          <div className="text-center text-lg h-60 flex justify-center items-center">
            <div className="pr-4">
              <img
                src="https://cdn.7tv.app/emote/60ae52bf9986a00349d753f0/4x.png"
                className="w-12 h-12"
              />
            </div>
            There are no videos in the playlist
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
