import { useState } from "react";
import Chats from "./messages/chats";
import Messages from "./messages/messages";
import Navbar from "./messages/navbar";

const App = () => {

  return (
    <div className="h-screen w-screen flex gap-4 bg-dark-grey p-4">
      <Navbar />
      <Chats />
      {/* <Messages /> */}
    </div>
  );
};

export default App;
