import ManageArticle from "./components/ManageSection";
import VideoSection from "./components/VideoSection";
import socket from "./utils/socket";
import { HandshakeDataType } from "../../common/types";
import useVideoPlayerStore from "./stores/videoPlayer/store";

const App = () => {
  const setIsServerPlaying = useVideoPlayerStore(
    (state) => state.setIsServerPlaying,
  );
  const setQueue = useVideoPlayerStore((state) => state.setQueue);
  const setPlayedSeconds = useVideoPlayerStore(
    (state) => state.setPlayedSeconds,
  );
  const setCurrentPlayingVideo = useVideoPlayerStore(
    (state) => state.setCurrentPlayingVideo,
  );

  socket.on("connected", (data: HandshakeDataType) => {
    setIsServerPlaying(data.isServerVideoPlaying);
    setQueue(data.queue);
    setCurrentPlayingVideo(data.currentVideo);
    setPlayedSeconds(data.playedSeconds);
  });

  return (
    <main className="w-full h-auto text-white">
      <VideoSection />
      <ManageArticle />
    </main>
  );
};

export default App;
