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

const Controls = ({ videoPlayerRef }: ControlsProps) => {
  const muted = useVideoPlayerStore((store) => store.muted);
  const playedSeconds = useVideoPlayerStore((store) => store.playedSeconds);

  const playerProgress = useVideoPlayerStore((store) => store.playerProgress);

  return (
    <div className="absolute w-screen h-screen top-0 max-h-screen">
      <Title />
      <div className="h-4/6 flex justify-center items-center">
        <CentralStatusButton />
      </div>
      <div className=" h-1/6 flex justify-center items-center gap-3 p-3">
        <StatusButton />
        <ProgressBar />
        <div>{secondsToHms(playerProgress.playedSeconds)}</div>
        <Volume />
        <FullScreen />
      </div>
    </div>
  );
};

export default Controls;
