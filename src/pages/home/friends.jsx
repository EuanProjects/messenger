import { PlusSquare } from "react-feather"
import "./styles/chats.css"
import FriendCard from "./friendcard"

function Friends() {
    return (
        <>
            <div className="chats-grid w-1/6 min-w-80 h-full bg-grey rounded-xl shadow-lg">
                <div className="chat-row1 w-full flex justify-between p-3 shadow-lg">
                    <h2 className="text-2xl font-bold text-light-grey">
                        Friends
                    </h2>
                    <button className="h-9 w-9 rounded-full bg-highlighted-grey flex items-center justify-center shadow-sm">
                        <PlusSquare size={20} className="stroke-light-grey" />
                    </button>
                </div>
                <div className="h-full w-full overflow-auto border-t-2 border-b-2 border-highlighted-grey">
                    <div>
                        <FriendCard/>
                        <FriendCard/>
                        <FriendCard/>
                        <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/> <FriendCard/>
                    </div>
                </div>
                <div className="chat-row3 h-14 w-full flex justify-between p-3">
                </div>
            </div>
            <div className="bg-grey w-full h-full rounded-lg grid place-items-center shadow-lg">
                <div>
                    <h3 className="text-white text-center text-4xl font-bold text-wrap">Click on a friend to start a message!</h3>
                </div>
            </div>
        </>
    )
}

export default Friends