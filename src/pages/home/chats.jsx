import { PlusSquare } from "react-feather";
import './styles/chats.css'
import ChatCard from "./ChatCard";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FriendCard from "./friendRequestCard";
import FriendChatCard from "./friendChatCard";

function Chats() {
    const API_URL = import.meta.env.VITE_API_URL
    const [displayNewChat, setDisplayNewChat] = useState(false);
    const [newChatSelected, setNewChatSelected] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState(new Set());
    const [friends, setFriends] = useState([]);
    const url = useLocation().pathname;
    const { profileId } = useParams()
    const isNotDisplayingMessages = url === "/home/chats";
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")


    useEffect(() => {
        async function getChats() {
            try {
                const response = await fetch(`http://${API_URL}/conversation/profile/${profileId}`, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    navigate("/");
                }
                const data = await response.json();
                setChats(data);

            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        async function getFriends() {
            try {
                const response = await fetch(`http://${API_URL}/profile/${profileId}/friends`, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    navigate("/");
                }
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error("Error trying to get friends: ", error);
            }
        }

        getChats();
        getFriends();
    }, [API_URL, profileId])

    function handleDisplayNewChat() {
        setDisplayNewChat(!displayNewChat);
    }

    function handleOnChange(id) {
        const updatedSelectedFriends = new Set(selectedFriends);
        if (selectedFriends.has(id)) {
            updatedSelectedFriends.delete(id);
            setSelectedFriends(updatedSelectedFriends);
        } else {
            updatedSelectedFriends.add(id)
            setSelectedFriends(updatedSelectedFriends);
        }
    }

    async function handleConfirmClick() {
        const profileIds = Array.from(selectedFriends);
        profileIds.push(profileId);
        try {
            const chatExistsResponse = await fetch(`http://${API_URL}/conversation/profile`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    profileIds: profileIds
                })
            })

            if (!chatExistsResponse.ok) {
                navigate("/");
            }

            const chat = await chatExistsResponse.json();
            if (!chat) {
                const createChatResponse = await fetch(`http://${API_URL}/conversation`, {
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        profileIds: profileIds
                    })
                })

                if (!createChatResponse.ok) {
                    navigate("/");
                }
            } else {
                navigate(`/home/profile/${profileId}/chats/${chat._id}`);
            }

        } catch (error) {
            console.error("Error setting up chat: ", error)
        }
        setSelectedFriends(new Set());
        setDisplayNewChat(!displayNewChat);
    }

    return (
        <>
            <div className={`order-1 ${isNotDisplayingMessages ? "chats-grid md:order-2" : " md:chats-grid md:order-2"} w-[calc(100vw-32px)] md:w-1/6 md:min-w-80 h-[calc(100vh-100px)] md:h-full bg-grey rounded-xl shadow-lg`}>
                <div className="chat-row1 w-full flex justify-between p-3">
                    <h2 className="text-2xl font-bold text-light-grey">
                        Chats
                    </h2>
                    <button className="h-9 w-9 rounded-full bg-highlighted-grey flex items-center justify-center shadow-sm"
                        onClick={handleDisplayNewChat}>
                        <PlusSquare size={20} className="stroke-light-grey" />
                    </button>
                </div>
                <div className="h-full w-full overflow-auto border-t-2 border-b-2 border-highlighted-grey">
                    {
                        chats.map(chat => (
                            <>
                                <ChatCard chat={chat} profileId={profileId} />
                            </>
                        ))
                    }

                </div>
                <div className="chat-row3 h-14 w-full flex justify-between p-3">
                </div>

            </div>
            <Outlet />
            {
                displayNewChat &&
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
                                    {
                                        friends.map(friend => {
                                            const isChecked = selectedFriends.has(friend._id);
                                            return (
                                                <FriendChatCard friend={friend} isChecked={isChecked} handleOnChange={handleOnChange} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-white p-3">
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleDisplayNewChat}>
                                    Cancel
                                </button>
                                <button className="bg-highlighted-grey rounded-lg" onClick={() => { handleConfirmClick() }}>
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