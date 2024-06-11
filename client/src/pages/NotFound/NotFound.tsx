import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-8xl gap-4">
      404
      <span className="text-lg flex gap-2">
        You are lost
        <img
          src="https://cdn.7tv.app/emote/60afbb3952a13d1adb34b2a1/4x.webp"
          style={{ width: 24, height: 24 }}
        />
      </span>
      <button
        className="text-lg flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800  rounded-md px-2 py-1 h-12 duration-100 active:bg-slate-600"
        onClick={() => navigate("/")}
      >
        Return to main page
      </button>
    </div>
  );
};

export default NotFound;
