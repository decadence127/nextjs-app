import { useEffect, useRef, useState } from "react";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import { io } from "socket.io-client";
import { flushSync } from "react-dom";

const connectChatServer = () => {
  const socket = io(process.env.CHAT_SOCKET_URL, {
    transports: ["websocket"],
  });
  return socket;
};

export default function Home() {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let socket = connectChatServer();
    socket.on("connect", () => {
      setConnected(true);
    });

    socketRef.current = socket;

    socket.onAny((type, message) => {
      const msg = message[1].data;
      console.log("type: ", type, " message: ", msg);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    let socket = socketRef.current;
    if (msg) socket.send("message", { data: msg });
  };

  return (
    <Card classNameProp="chatCard">
      <Input
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        classNameProp="chatInput"
      />
      <button onClick={handleSend}>send</button>
      {connected ? <p>connected</p> : <p>trying to connect...</p>}
    </Card>
  );
}
