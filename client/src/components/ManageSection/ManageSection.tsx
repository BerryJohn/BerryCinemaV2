import Playlist from "./Playlist";
import socket from "./../../utils/socket";
import { useEffect, useState } from "react";
import AddVideoForm from "./AddVideoForm";

const ManageSection = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <article className="w-full h-auto bg-slate-900 border-slate-700 border border-t-0 grid grid-cols-3 p-2">
      <Playlist />
      <AddVideoForm />
      {isConnected ? <p>Connected</p> : <p>Disconnected</p>}
    </article>
  );
};

export default ManageSection;
