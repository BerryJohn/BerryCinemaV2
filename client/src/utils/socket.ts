import { io } from "socket.io-client";

const URL = import.meta.env.WEBSOCKET_SERVER_ADDRESS ?? "http://localhost:3000";

export const socket = io(URL);

export default socket;
