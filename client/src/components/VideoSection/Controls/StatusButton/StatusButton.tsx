import socket from "./../../../../utils/socket";
import useVideoPlayerStore from "./../../../../stores/videoPlayer/store";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from "react-icons/tb";
import { iconStyle } from "./../commonStyles";

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
    <button
      className="hover:bg-slate-600 hover:bg-opacity-50 rounded-sm flex p-1 duration-75"
      onClick={() => {
        if (isServerPlaying && isLocallyPlaying) {
          stopServerVideo();
          setIsLocallyPlaying(false);
        } else {
          playServerVideo();
          setIsLocallyPlaying(true);
          socket.emit("syncTime");
        }
      }}
    >
      {isServerPlaying && isLocallyPlaying ? (
        <TbPlayerPauseFilled style={iconStyle} />
      ) : (
        <TbPlayerPlayFilled style={iconStyle} />
      )}
    </button>
  );
};

export default StatusButton;
