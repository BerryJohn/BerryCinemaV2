import socket from "./utils/socket";
import { HandshakeDataType } from "../../common/types";
import useVideoPlayerStore from "./stores/videoPlayer/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  const setIsServerPlaying = useVideoPlayerStore(
    (state) => state.setIsServerPlaying,
  );
  const setQueue = useVideoPlayerStore((state) => state.setQueue);
  const setCurrentPlayingVideo = useVideoPlayerStore(
    (state) => state.setCurrentPlayingVideo,
  );
  const setPlayedSeconds = useVideoPlayerStore(
    (state) => state.setPlayedSeconds,
  );

  socket.on("connected", (data: HandshakeDataType) => {
    setIsServerPlaying(data.isServerVideoPlaying);
    setQueue(data.queue);
    setCurrentPlayingVideo(data.currentVideo);
    setPlayedSeconds(data.playedSeconds);
  });

  useEffect(() => {
    socket.on("videoPlayed", () => {
      setIsServerPlaying(true);
    });

    socket.on("videoStopped", () => {
      setIsServerPlaying(false);
    });

    return () => {
      socket.off("videoPlayed");
      socket.off("videoStopped");
    };
  }, [setIsServerPlaying]);

  useEffect(() => {
    socket.on("queueUpdate", (queue) => {
      setQueue(queue);
    });
    return () => {
      socket.off("queueUpdate");
    };
  }, [setQueue]);

  return (
    <main className="w-full min-h-screen h-auto text-white bg-slate-900">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
