import socket from "../../../../utils/socket";
import useVideoPlayerStore from "./../../../../stores/videoPlayer/store";
import { IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";

const iconStyle = { width: 35, height: 35 };

const playServerVideo = () => {
  socket.emit("play");
};

const stopServerVideo = () => {
  socket.emit("stop");
};

const StatusButton = () => {
  const isServerPlaying = useVideoPlayerStore((store) => store.isServerPlaying);
  const isLocallyPlaying = useVideoPlayerStore(
    (store) => store.isLocallyPlaying,
  );
  const setIsLocallyPlaying = useVideoPlayerStore(
    (store) => store.setIsLocallyPlaying,
  );

  return (
    <div>
      <button
        onClick={() => {
          if (isServerPlaying && isLocallyPlaying) {
            stopServerVideo();
            setIsLocallyPlaying(false);
          } else {
            playServerVideo();
            setIsLocallyPlaying(true);
          }
        }}
      >
        {isServerPlaying && isLocallyPlaying ? (
          <IoStopCircleOutline style={iconStyle} />
        ) : (
          <IoPlayCircleOutline style={iconStyle} />
        )}
      </button>
    </div>
  );
};

export default StatusButton;
