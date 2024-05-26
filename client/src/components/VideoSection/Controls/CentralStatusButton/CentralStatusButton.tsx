import useVideoPlayerStore from "./../../../../stores/videoPlayer/store";
import socket from "./../../../../utils/socket";
import { IoPlayCircleOutline, IoStopCircleOutline } from "react-icons/io5";

const iconStyle = { width: 100, height: 100 };

const playServerVideo = () => {
  socket.emit("play");
};

const stopServerVideo = () => {
  socket.emit("stop");
};

const CentralStatusButton = () => {
  const isServerPlaying = useVideoPlayerStore((store) => store.isServerPlaying);
  const isLocallyPlaying = useVideoPlayerStore(
    (store) => store.isLocallyPlaying,
  );
  const setIsLocallyPlaying = useVideoPlayerStore(
    (store) => store.setIsLocallyPlaying,
  );

  return (
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
  );
};

export default CentralStatusButton;
