import { IoExpand, IoContract } from "react-icons/io5";
import { iconStyle } from "./../commonStyles";
import useVideoPlayerStore from "@Berry/stores/videoPlayer/store";

const FullScreen = () => {
  const isFullScreen = useVideoPlayerStore((store) => store.isFullScreen);
  const setIsFullScreen = useVideoPlayerStore((store) => store.setIsFullScreen);

  return (
    <button
      className="hover:bg-slate-600 hover:bg-opacity-50 rounded-sm flex p-1 duration-75"
      onClick={() => setIsFullScreen(!isFullScreen)}
    >
      {isFullScreen ? (
        <IoContract style={iconStyle} />
      ) : (
        <IoExpand style={iconStyle} />
      )}
    </button>
  );
};

export default FullScreen;
