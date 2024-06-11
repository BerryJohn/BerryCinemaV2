import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import socket from "@Berry/utils/socket";
import ReactPlayer from "react-player";

type ErrorFormType = {
  title: string | undefined;
  url: string | undefined;
  description: string | undefined;
};

const initialFormErrors: ErrorFormType = {
  title: undefined,
  url: undefined,
  description: undefined,
};

const changeValueByRef = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
  const [formErrors, setFormErrors] =
    useState<ErrorFormType>(initialFormErrors);
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const titleRef = useRef("");
  const [urlValue, setUrlValue] = useState("");
  const descriptionRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const potentialErrors: ErrorFormType = { ...initialFormErrors };

    if (!ReactPlayer.canPlay(urlValue)) {
      potentialErrors.url = "Invalid URL";
    }
    if (titleRef.current.length < 3 || titleRef.current.length > 50) {
      potentialErrors.title = "Title must be between 3 and 50 characters";
    }
    if (descriptionRef.current.length > 100) {
      potentialErrors.description =
        "Description must be less than 100 characters";
    }

    setFormErrors((p) => ({ ...p, ...potentialErrors }));

    if (
      Object.values(potentialErrors).filter((el) => el !== undefined).length > 0
    ) {
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
    e.target.reset();
    titleRef.current = "";
    descriptionRef.current = "";
    setUrlValue("");
  };

  return (
    <div className="py-1 px-4">
      <span className="text-3xl">Add Video Form</span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 text-black">
        <div className="w-full text-white flex flex-col">
          <span>Title</span>
          <input
            className="bg-transparent border-slate-700 border text-2xl px-2 py-1 rounded-md focus:ring-0 focus:outline-none focus:border-indigo-800"
            type="text"
            onChange={(e) => changeValueByRef(e, titleRef)}
          />
          {formErrors.title ? (
            <span className="text-red-500 text-sm">{formErrors.title}</span>
          ) : null}
        </div>
        <div className="w-full text-white flex flex-col">
          <span>URL</span>
          <input
            className="bg-transparent border-slate-700 border text-2xl px-2 py-1 rounded-md focus:ring-0 focus:outline-none focus:border-indigo-800"
            type="text"
            value={urlValue}
            onChange={(e) => changeValueByState(e, setUrlValue)}
          />
          {formErrors.url ? (
            <span className="text-red-500 text-sm">{formErrors.url}</span>
          ) : null}
        </div>
        <div className="w-full text-white flex flex-col">
          <span>Description</span>
          <textarea
            className="bg-transparent border-slate-700 border px-2 py-1 rounded-md max-h-24 min-h-24 focus:ring-0 focus:outline-none focus:border-indigo-800"
            onChange={(e) => changeValueByRef(e, descriptionRef)}
          />
          {formErrors.description ? (
            <span className="text-red-500 text-sm">
              {formErrors.description}
            </span>
          ) : null}
        </div>
        <button
          className={`flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 text-white rounded-md px-2 py-1 w-full h-12 duration-100 active:bg-slate-600 `}
          type="submit"
        >
          Add Video
        </button>
      </form>
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
