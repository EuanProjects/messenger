import { useState } from "react";
import Chats from "./pages/messages/chats";
import Messages from "./pages/messages/messages";
import Navbar from "./pages/messages/navbar";

const App = () => {

  return (
    <div className="h-screen w-screen flex gap-4 bg-dark-grey p-4">
      <Navbar />
      <Chats />
      <Messages />
    </div>
  );
};

export default App;
