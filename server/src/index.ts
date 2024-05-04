import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const options = {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
};
const io = new Server(httpServer, options);

io.on("connection", (socket: Socket) => {
  console.log("connected");
  console.log(socket);
});

httpServer.listen(3000);
