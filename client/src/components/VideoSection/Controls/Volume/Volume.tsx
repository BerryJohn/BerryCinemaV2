import {
  IoVolumeMuteOutline,
  IoVolumeOffOutline,
  IoVolumeLowOutline,
  IoVolumeMediumOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import useVideoPlayerStore from "./../../../../stores/videoPlayer/store";
import { ChangeEvent, useCallback } from "react";

const iconStyle = { width: 35, height: 35 };

const Volume = () => {
  const setVolume = useVideoPlayerStore((store) => store.setVolume);
  const volume = useVideoPlayerStore((store) => store.volume);

  const handleVolumeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVolume(Number(e.target.value));
      localStorage.setItem("volume", e.target.value);
    },
    [setVolume],
  );

  return (
    <div>
      {volume === 0 ? (
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
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default Volume;
