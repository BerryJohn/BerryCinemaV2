import useVideoPlayerStore from "./../../../stores/videoPlayer/store";
import socket from "../../../utils/socket";
import ControlsProps from "./types";
import { secondsToHms } from "../../../utils/helpers";

import Volume from "./Volume";
import FullScreen from "./FullScreen";
import ProgressBar from "./ProgressBar";
import StatusButton from "./StatusButton";
import Title from "./Title";
import CentralStatusButton from "./CentralStatusButton";
import { useEffect, useRef, useState } from "react";

const Controls = ({ videoPlayerRef }: ControlsProps) => {
  const muted = useVideoPlayerStore((store) => store.muted);
  const playedSeconds = useVideoPlayerStore((store) => store.playedSeconds);

  const playerProgress = useVideoPlayerStore((store) => store.playerProgress);

  const divRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [mouseStopped, setMouseStopped] = useState(true);

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

  return (
    <div
      ref={divRef}
      className={`absolute w-screen h-screen top-0 max-h-screen group`}
    >
      <div
        className={`bg-gradient-to-b from-black to-transparent h-1/6 p-2 text-2xl invisible  ${!mouseStopped && "group-hover:visible group-hover:opacity-100 transition opacity-0"}`}
      >
        <Title />
      </div>

      <div
        className={`h-4/6 flex justify-center items-center invisible ${!mouseStopped && "group-hover:visible group-hover:opacity-100 transition opacity-0"}`}
      >
        <CentralStatusButton />
      </div>
      <div
        className={`h-1/6 flex justify-center items-center gap-3 p-3 invisible ${!mouseStopped && "group-hover:visible group-hover:opacity-100 transition opacity-0"}`}
      >
        <StatusButton />
        <ProgressBar videoPlayerRef={videoPlayerRef} />
        <div>{secondsToHms(playerProgress.playedSeconds)}</div>
        <Volume />
        <FullScreen />
      </div>
    </div>
  );
};

export default Controls;
