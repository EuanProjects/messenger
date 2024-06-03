import { PlusSquare } from "react-feather";
import './styles/chats.css'
import ChatCard from "./ChatCard";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import FriendCard from "./friendcard";



function Chats() {
    const [displayNewChat, setDisplayNewChat] = useState(false);
    const [newChatSelected, setNewChatSelected] = useState(false);
    const url = useLocation().pathname;
    const isNotDisplayingMessages = url === "/home/chats";
    console.log(displayNewChat)
    
    function handleDisplayNewChat() {
        setDisplayNewChat(!displayNewChat);
    }

    function handleNewChatSelected() {
        setNewChatSelected(!newChatSelected);
    }
    return (
        <>
            <div className={`${isNotDisplayingMessages ? "chats-grid md:order-2" : "hidden md:chats-grid md:order-2"} w-[calc(100vw-32px)] md:w-1/6 md:min-w-80 h-[calc(100vh-100px)] md:h-full bg-grey rounded-xl shadow-lg`} onClick={handleDisplayNewChat}>
                <div className="chat-row1 w-full flex justify-between p-3">
                    <h2 className="text-2xl font-bold text-light-grey">
                        Chats
                    </h2>
                    <button className="h-9 w-9 rounded-full bg-highlighted-grey flex items-center justify-center shadow-sm">
                        <PlusSquare size={20} className="stroke-light-grey" />
                    </button>
                </div>
                <div className="h-full w-full overflow-auto border-t-2 border-b-2 border-highlighted-grey">
                    <ChatCard />
                    <ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard /><ChatCard />
                </div>
                <div className="chat-row3 h-14 w-full flex justify-between p-3">
                </div>

            </div>
            <Outlet />
            {
                !displayNewChat &&
                <>
                    <div className="h-screen w-screen grid place-items-center shadow-sm bg-black/70 absolute top-0 left-0" onClick={handleDisplayNewChat}>
                        <div className="settings-grid relative w-1/2 h-3/4 max-h-[700px] max-w-[637px] rounded-lg bg-grey opacity-100" onClick={(e) => e.stopPropagation()}>
                            <div className="p-3">
                                <h2 className="text-white text-center">New Chat</h2>
                                <button className="absolute top-0 right-0 bg-highlighted-grey rounded-full h-6 w-6 text-white m-3"
                                    onClick={handleDisplayNewChat}>X</button>
                            </div>
                            <div className="overflow-y-auto grid p-4">
                                <div className="overflow-auto">
                                    <FriendCard onClick={handleNewChatSelected}/>
                                    <FriendCard onClick={handleNewChatSelected}/>
                                    <FriendCard onClick={handleNewChatSelected}/>
                                    <FriendCard onClick={handleNewChatSelected}/>
                                    <FriendCard onClick={handleNewChatSelected}/>
                                    <FriendCard onClick={handleNewChatSelected}/>
                                    <FriendCard onClick={handleNewChatSelected}/>

                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-white p-3">
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleDisplayNewChat}>
                                    Cancel
                                </button>
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleDisplayNewChat}>
                                    Confirm
                                </button>

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Chats;