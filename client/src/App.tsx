import { useEffect, useState } from "react";
import ManageArticle from "./components/ManageSection";
import VideoSection from "./components/VideoSection";

import { io } from "socket.io-client";

const URL = import.meta.env.WEBSOCKET_SERVER_ADDRESS ?? "http://localhost:3000";

const socket = io(URL);

const App = () => {
  console.log(`URL: ${URL}`);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <main className="w-full h-auto text-white">
      <VideoSection />
      <ManageArticle />
      {isConnected ? <p>Connected</p> : <p>Disconnected</p>}
    </main>
  );
};

export default App;
