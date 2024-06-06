import { PlusSquare } from "react-feather"
import "./styles/chats.css"
import FriendCard from "./friendcard"
import { useState } from "react"

function Friends() {
    const [displayFindNewFriend, setDisplayFindNewFriend] = useState(false);
    const [newFriendSelected, setNewFriendSelected] = useState(false);

    function handleFindNewFriend() {
        setDisplayFindNewFriend(!displayFindNewFriend)
    }

    function handleNewFriendSelected() {
        setNewFriendSelected(!newFriendSelected)
    }

    return (
        <>
            <div className="chats-grid md:order-2 w-[calc(100vw-32px)] md:w-1/6 md:min-w-80 h-[calc(100vh-100px)] md:h-full bg-grey rounded-xl shadow-lg">
                <div className="chat-row1 w-full flex justify-between p-3 shadow-lg">
                    <h2 className="text-2xl font-bold text-light-grey">
                        Friends
                    </h2>
                    <button className="h-9 w-9 rounded-full bg-highlighted-grey flex items-center justify-center shadow-sm" onClick={handleFindNewFriend}>
                        <PlusSquare size={20} className="stroke-light-grey" />
                    </button>
                </div>
                <div className="h-full w-full overflow-auto border-t-2 border-b-2 border-highlighted-grey">
                    <div>
                        <FriendCard />
                        <FriendCard />
                        <FriendCard />
                        <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard /> <FriendCard />
                    </div>
                </div>
                <div className="chat-row3 h-14 w-full flex justify-between p-3">
                </div>
            </div>
            <div className="hidden order-3 md:grid bg-grey w-full h-full rounded-lg place-items-center shadow-lg">
                <div>
                    <h3 className="text-white text-center text-4xl font-bold text-wrap">Click on a friend to start a message!</h3>
                </div>
            </div>
            {
                displayFindNewFriend &&
                <>
                    <div className="h-screen w-screen grid place-items-center shadow-sm bg-black/70 absolute top-0 left-0" onClick={handleFindNewFriend}>
                        <div className="settings-grid relative w-1/2 h-3/4 max-h-[700px] max-w-[637px] rounded-lg bg-grey opacity-100" onClick={(e) => e.stopPropagation()}>
                            <div className="p-3">
                                <h2 className="text-white text-center">People on Messenger</h2>
                                <button className="absolute top-0 right-0 bg-highlighted-grey rounded-full h-6 w-6 text-white m-3"
                                    onClick={handleFindNewFriend}>X</button>
                            </div>
                            <div className="overflow-y-auto grid p-4">
                                <div className="overflow-auto">
                                    <FriendCard onClick={handleNewFriendSelected}/>
                                    <FriendCard onClick={handleNewFriendSelected}/>
                                    <FriendCard onClick={handleNewFriendSelected}/>
                                    <FriendCard onClick={handleNewFriendSelected}/>
                                    <FriendCard onClick={handleNewFriendSelected}/>
                                    <FriendCard onClick={handleNewFriendSelected}/>
                                    <FriendCard onClick={handleNewFriendSelected}/>

                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-white p-3">
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleFindNewFriend}>
                                    Cancel
                                </button>
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleFindNewFriend}>
                                    Add
                                </button>

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Friends