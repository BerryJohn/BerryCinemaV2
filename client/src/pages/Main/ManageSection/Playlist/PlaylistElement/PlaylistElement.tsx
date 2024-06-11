import socket from "@Berry/utils/socket";
import PlaylistElementProps from "./types";
import { RiDeleteBin2Line } from "react-icons/ri";
import { secondsToHms } from "@Berry/utils/helpers";

const removeVideo = (videoId: string) => {
  socket.emit("removeVideo", videoId);
};

const PlaylistElement = ({ video, index }: PlaylistElementProps) => {
  return (
    <div
      className={`group h-40 bg-slate-800 rounded-lg overflow-hidden flex ${index === 0 ? "bg-gradient-to-r from-slate-900 to-indigo-900" : ""}`}
    >
      <img
        className={`h-full w-full max-w-64 object-cover bg-black ${video?.thumbnail ? "" : "object-scale-down"}`}
        src={
          video?.thumbnail ??
          "https://cdn.7tv.app/emote/603caa69faf3a00014dff0b1/4x.webp"
        }
        alt="thumbnail"
      />
      <div className="px-3 py-4 w-full h-full relative flex flex-col content-end justify-between">
        <div className="w-full h-1/4 text-2xl">{video.title}</div>
        <div className="w-full h-3/4 text-sm opacity-70 group-hover:opacity-100">
          {video.description}
        </div>
        <div className="flex flex-col content-end justify-end">
          <button
            className="opacity-70 hover:opacity-100 absolute top-3 right-3 p-2 bg-slate-500 rounded-full hover:bg-red-600 transition-colors duration-300 ease-in-out"
            onClick={() => {
              removeVideo(video.id ?? "");
            }}
          >
            <RiDeleteBin2Line />
          </button>
          <span className="text-sm ">
            <span className="opacity-60 select-none"> Added by: </span>
            <span className="bg-slate-600 px-1 rounded-sm">
              {video?.author ?? "uknown"}
            </span>
          </span>
          <span className="text-sm">
            <span className="opacity-60 select-none"> Duration: </span>
            <span className="bg-slate-600 px-1 rounded-sm">
              {secondsToHms(video?.video.duration ?? 0)}
            </span>
          </span>
          <span className="text-sm">
            <span className="opacity-60 select-none"> Video ID: </span>
            <span className="bg-slate-600 px-1 rounded-sm font-mono">
              {video.id}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistElement;
