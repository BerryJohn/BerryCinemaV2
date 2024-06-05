import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import socket from "./../../../utils/socket";
import ReactPlayer from "react-player";
import { RxCross1, RxCheck } from "react-icons/rx";

const changeValueByRef = (
  e: ChangeEvent<HTMLInputElement>,
  ref: MutableRefObject<string>,
) => {
  ref.current = e.target.value;
};

const changeValueByState = (
  e: ChangeEvent<HTMLInputElement>,
  setState: (value: string) => void,
) => {
  setState(e.target.value);
};

const AddVideoForm = () => {
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const titleRef = useRef("");
  const [urlValue, setUrlValue] = useState("");
  const descriptionRef = useRef("");

  const handleSubmit = () => {
    if (!ReactPlayer.canPlay(urlValue)) {
      alert("Invalid URL");
      return;
    }
    socket.emit("addVideo", {
      title: titleRef.current,
      description: descriptionRef.current,
      video: {
        duration: videoPlayerRef.current?.getDuration(),
        url: urlValue,
      },
    });
  };

  return (
    <div className="py-1 px-4">
      <span className="text-3xl">Add Video Form</span>
      <div className="flex flex-col gap-1 text-black">
        <div className="w-full text-white flex flex-col">
          <span>Title</span>
          <input
            className="bg-transparent border-slate-700 border text-2xl px-2 py-1 rounded-md focus:ring-0 focus:outline-none focus:border-indigo-800"
            type="text"
            onChange={(e) => changeValueByRef(e, titleRef)}
          />
        </div>
        <div className="w-full text-white flex flex-col">
          <span>URL</span>
          <input
            className="bg-transparent border-slate-700 border text-2xl px-2 py-1 rounded-md focus:ring-0 focus:outline-none focus:border-indigo-800"
            type="text"
            onChange={(e) => changeValueByState(e, setUrlValue)}
          />
        </div>
        <div className="w-full text-white flex flex-col">
          <span>Description</span>
          <textarea
            className="bg-transparent border-slate-700 border px-2 py-1 rounded-md max-h-24 min-h-24 focus:ring-0 focus:outline-none focus:border-indigo-800"
            onChange={(e) => changeValueByState(e, setUrlValue)}
          />
        </div>
        <button
          className={`flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 text-white rounded-md px-2 py-1 w-full h-12 duration-100 active:bg-slate-600 ${urlValue.length > 0 ? (ReactPlayer.canPlay(urlValue) ? "border-green-500" : "border-red-500") : ""}`}
          onClick={handleSubmit}
          disabled={!ReactPlayer.canPlay(urlValue)}
        >
          Add Video
          {ReactPlayer.canPlay(urlValue) ? (
            <RxCheck className="h-6 w-6" />
          ) : (
            <RxCross1 className="h-4 w-4" />
          )}
        </button>
      </div>
      {/* player here  qis needed to estimate the lenght of video */}
      <ReactPlayer
        url={urlValue}
        ref={videoPlayerRef}
        muted
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AddVideoForm;
