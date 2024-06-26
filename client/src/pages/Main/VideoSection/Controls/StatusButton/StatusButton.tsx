import socket from "@Berry/utils/socket";
import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from "react-icons/tb";
import { iconStyle } from "./../commonStyles";

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
          setIsLocallyPlaying(false);
        } else {
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
