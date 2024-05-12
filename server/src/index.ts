import { createServer } from "http";
import { Server, Socket } from "socket.io";
import VideoPlayerHandler from "./PlayerHandler";
import { VideoInfoType } from "./../../common/types";

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
  console.log("connected");
  socket.on("play", () => {
    try {
      VideoPlayer.play();
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("stop", () => {
    try {
      VideoPlayer.stop();
    } catch (e) {
      console.log(e.message);
    }
  });

  socket.on("addVideo", (data: VideoInfoType) => {
    try {
      VideoPlayer.addVideo(data);
    } catch (e) {
      console.log(e.message);
    }
  });
});

httpServer.listen(3000);
