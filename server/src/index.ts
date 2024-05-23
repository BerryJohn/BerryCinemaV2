import { createServer } from "http";
import { Server, Socket } from "socket.io";
import VideoPlayerHandler from "./PlayerHandler";
import { VideoInfoType, HandshakeDataType } from "./../../common/types";

const httpServer = createServer();
const options = {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
};
const io = new Server(httpServer, options);

const VideoPlayer = new VideoPlayerHandler();

io.on("connection", (socket: Socket) => {
  socket.emit("connected", {
    isServerVideoPlaying: VideoPlayer.isPlaying,
    currentVideo: VideoPlayer.currentVideo,
    queue: VideoPlayer.queue,
    playedSeconds: VideoPlayer.duration,
  } as HandshakeDataType);

  socket.on("play", () => {
    try {
      VideoPlayer.play();
      io.emit("videoPlayed");
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("stop", () => {
    try {
      VideoPlayer.stop();
      io.emit("videoStopped");
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("addVideo", (data: VideoInfoType) => {
    try {
      VideoPlayer.addVideo(data);
      io.emit("queueUpdate", VideoPlayer.queue);
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("removeVideo", (videoID: string) => {
    try {
      VideoPlayer.removeVideo(videoID);
      io.emit("queueUpdate", VideoPlayer.queue);
    } catch (e) {
      console.log(e.message);
    }
  });
});

httpServer.listen(3000);
