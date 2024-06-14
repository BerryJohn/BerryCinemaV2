import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";
import ControlsProps from "./types";
import { secondsToHms } from "@Berry/utils/helpers";
import Volume from "./Volume";
import FullScreenButton from "./FullScreen";
import ProgressBar from "./ProgressBar";
import StatusButton from "./StatusButton";
import Title from "./Title";
import CentralStatusButton from "./CentralStatusButton";
import { useEffect, useRef, useState } from "react";

const Controls = ({ videoPlayerRef }: ControlsProps) => {
  const playerProgress = useVideoPlayerStore((store) => store.playerProgress);
  const isLocallyPlaying = useVideoPlayerStore(
    (store) => store.isLocallyPlaying,
  );
  const isServerPlaying = useVideoPlayerStore((store) => store.isServerPlaying);

  const divRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [mouseStopped, setMouseStopped] = useState(true);
  const playedSeconds = useVideoPlayerStore((store) => store.playedSeconds);

  const handleMouseMove = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    setMouseStopped(false);

    timerRef.current = window.setTimeout(() => {
      console.log("Mouse stopped moving");
      setMouseStopped(true);
    }, 2000);
  };

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("mousemove", handleMouseMove);
      }
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (videoPlayerRef.current) {
      console.log("playedSeconds", playedSeconds);
      videoPlayerRef.current.seekTo(playedSeconds, "seconds");
    }
  }, []);

  return (
    <div
      ref={divRef}
      className={`absolute w-screen h-screen top-0 max-h-screen group overflow-hidden`}
    >
      <div
        className={`h-1/6 px-6 py-4 invisible ${(!mouseStopped || (!isServerPlaying && !isLocallyPlaying)) && "group-hover:visible group-hover:opacity-100 transition opacity-0"}`}
      >
        <Title />
      </div>
      <div
        className={`h-4/6 flex justify-center items-center invisible ${(!mouseStopped || (!isServerPlaying && !isLocallyPlaying)) && "group-hover:visible group-hover:opacity-100 transition opacity-0"}`}
      >
        <CentralStatusButton />
      </div>
      <div
        className={`h-1/6 px-6 py-4 flex flex-row flex-wrap justify-center items-center content-end invisible ${(!mouseStopped || (!isServerPlaying && !isLocallyPlaying)) && "group-hover:visible group-hover:opacity-100 transition opacity-0"}`}
      >
        <div className="flex w-full justify-center items-center gap-4">
          <StatusButton />
          <ProgressBar videoPlayerRef={videoPlayerRef} />
          <div className="hover:bg-slate-600 hover:bg-opacity-50 rounded-sm flex p-1 duration-75">
            {secondsToHms(playerProgress.playedSeconds)}
          </div>
          <Volume />
          <FullScreenButton />
        </div>
      </div>
    </div>
  );
};

export default Controls;
