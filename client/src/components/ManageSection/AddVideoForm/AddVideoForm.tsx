import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import socket from "./../../../utils/socket";
import ReactPlayer from "react-player";

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
    <div>
      <h1>Add Video Form</h1>
      <div className="flex flex-col gap-1 text-black">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => changeValueByRef(e, titleRef)}
        />
        <input
          type="text"
          placeholder="URL"
          value={urlValue}
          onChange={(e) => changeValueByState(e, setUrlValue)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => changeValueByRef(e, descriptionRef)}
        />
        <button
          className="border border-slate-700 hover:bg-slate-800 text-white"
          onClick={handleSubmit}
        >
          Add Video
        </button>
      </div>
      {/* player here is needed to estimate the lenght of video */}
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
