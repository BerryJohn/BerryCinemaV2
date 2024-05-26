import { IoExpand, IoContract } from "react-icons/io5";

const iconStyle = { width: 35, height: 35 };

const FullScreen = () => {
  return (
    <button>
      <IoExpand style={iconStyle} />
    </button>
  );
};

export default FullScreen;
