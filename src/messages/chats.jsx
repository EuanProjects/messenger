import { PlusSquare } from "react-feather";
import './styles/chats.css'
import Card from "./card";

function Chats() {
    return (
        <>
            <div className="chats-grid w-1/6 min-w-80 h-full bg-grey rounded-xl shadow-inner">
                <div className="chat-row15 w-full flex justify-between p-3">
                    <h2 className="text-2xl font-bold text-light-grey">
                        Chats
                    </h2>
                    <button className="h-9 w-9 rounded-full bg-highlighted-grey flex items-center justify-center">
                        <PlusSquare size={20} className="stroke-light-grey" />
                    </button>
                </div>
                <div className="h-full w-full overflow-auto">
                    <div className="border-t-2 border-highlighted-grey sticky top-0"></div>
                    <Card/>
                    <Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/>
                    <div className="border-t-2 border-highlighted-grey sticky bottom-0"></div>
                </div>
                <div className="chat-row3 h-14 w-full flex justify-between p-3">
                </div>

            </div>
        </>
    )
}

export default Chats;