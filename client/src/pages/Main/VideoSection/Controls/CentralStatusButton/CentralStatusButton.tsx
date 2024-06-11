import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";
import socket from "@Berry/utils/socket";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from "react-icons/tb";

const iconStyle = { width: 50, height: 50 };

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
          setIsLocallyPlaying(false);
        } else {
          setIsLocallyPlaying(true);
          socket.emit("syncTime");
        }
      }}
    >
      <div className="w-24 h-24 bg-slate-600 bg-opacity-50 hover:bg-opacity-80 duration-150 rounded-full flex items-center justify-center">
        {isServerPlaying && isLocallyPlaying ? (
          <TbPlayerPauseFilled style={iconStyle} />
        ) : (
          <TbPlayerPlayFilled style={iconStyle} />
        )}
      </div>
    </button>
  );
};

export default CentralStatusButton;
