import {
  IoVolumeMuteOutline,
  IoVolumeOffOutline,
  IoVolumeLowOutline,
  IoVolumeMediumOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";
import { ChangeEvent, useCallback } from "react";
import { iconStyle } from ".././commonStyles";

const Volume = () => {
  const setVolume = useVideoPlayerStore((store) => store.setVolume);
  const volume = useVideoPlayerStore((store) => store.volume);
  const muted = useVideoPlayerStore((store) => store.muted);
  const setMuted = useVideoPlayerStore((store) => store.setMuted);

  const handleVolumeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVolume(Number(e.target.value));
      localStorage.setItem("volume", e.target.value);
    },
    [setVolume],
  );

  return (
    <div className="hover:bg-slate-600 hover:bg-opacity-50 rounded-sm flex p-1 duration-75 relative group/volume">
      <button
        onClick={() => {
          setMuted(!muted);
        }}
      >
        {volume === 0 || muted ? (
          <IoVolumeMuteOutline style={iconStyle} />
        ) : volume < 30 ? (
          <IoVolumeOffOutline style={iconStyle} />
        ) : volume < 60 ? (
          <IoVolumeLowOutline style={iconStyle} />
        ) : volume < 80 ? (
          <IoVolumeMediumOutline style={iconStyle} />
        ) : (
          <IoVolumeHighOutline style={iconStyle} />
        )}
      </button>
      <div className="absolute -rotate-90 origin-left left-4 -top-4 flex align-center py-2 px-1 bg-slate-600 bg-opacity-50 group-hover/volume:opacity-100 duration-150 rounded-sm opacity-0">
        <input
          className="h-1 accent-indigo-500 hover:accent-indigo-500 focus:accent-indigo-600 cursor-pointer"
          type="range"
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default Volume;
