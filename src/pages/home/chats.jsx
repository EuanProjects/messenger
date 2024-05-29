import { PlusSquare } from "react-feather";
import './styles/chats.css'
import ChatCard from "./ChatCard";
import Messages from "./messages";
import { Outlet } from "react-router-dom";


function Chats() {
    return (
        <>
            <div className="chats-grid md:order-2 w-[calc(100vw-32px)] md:w-1/6 md:min-w-80 h-[calc(100vh-100px)] md:h-full bg-grey rounded-xl shadow-lg">
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
        </>
    )
}

export default Chats;