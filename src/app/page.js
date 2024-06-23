import socketClient  from "socket.io-client";
import Chat from "./chat/Chat";

const SERVER = "http://127.0.0.1:8081";

export default function Home() {
  const socket = socketClient (SERVER);

  return (
    <main >
      <Chat/>
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        
      </div> */}
    </main>
  );
}
