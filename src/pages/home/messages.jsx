import { useEffect, useState, useRef } from "react";
import { MoreHorizontal, Image, Send } from "react-feather";
import { useParams } from "react-router-dom";
import "./styles/messages.css";
import Settings from "./settings";

function Messages() {
    const API_URL = import.meta.env.VITE_API_URL
    const { chatId } = useParams();
    const themes = {
        "Default": "#6A36EB",
        "Blue": "#0E92EB",
        "Amber": "#ffbf00",
        "Lime": "#84cc16",
        "Yellow": "#facc15",
        "Orange": "#fb923c",
    };
    const paragraphRef = useRef(null);
    const [currentTheme, setCurrentTheme] = useState("Default");
    const [participants, setParticipants] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [refresh, setRefresh] = useState(false);
    const { profileId } = useParams();

    function handleShowSettings() {
        setShowSettings(!showSettings);
    }

    function handleMessageInputChange(e) {
        setMessageInput(e.target.value)
    }

    async function handleSendMessage(e) {
        try {
            const response = await fetch(`http://${API_URL}/message/${chatId}`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageInput,
                    profileId: profileId
                })
            });

            const data = await response.json();
            console.log(data);
            setMessageInput("");
            setRefresh(!refresh);
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    useEffect(() => {
        async function getChat() {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`http://${API_URL}/conversation/${chatId}`, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCurrentTheme(data.theme);
                setParticipants(data.profileIds);


            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        async function getMessages() {
            console.log("getting messages")
            try {
                const response = await fetch(`http://${API_URL}/message/${chatId}`, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setMessages(data);
                paragraphRef.current.scrollIntoView({
                    behavior: "smooth",
                })
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }



        if (chatId) {
            getChat();
            getMessages();
        }
    }, [API_URL, chatId, participants.length, refresh])

    const groupedMessages = messages.reduce((acc, message) => {
        const date = new Date(message.timestamp).toISOString().split('T')[0];
        acc[date] = acc[date] || [];
        acc[date].push(message);
        return acc;
    }, {});

    console.log(participants);
    return (
        <>
            <div className={`order-1 md:order-3 ${showSettings ? 'hidden md:messages-grid md:w-4/6' : 'messages-grid w-full md:w-5/6'} h-[calc(100vh-92px)] md:h-full bg-grey rounded-xl shadow-lg`}>
                <div className="flex justify-between p-3 drop-shadow-sm">
                    <div className="h-14 flex">
                        <div className="h-12 w-12 p-[6px]">
                            <div className="h-9 w-9 bg-white rounded-full"></div>
                        </div>
                        <div className="ml-1 text-light-grey">
                            <span className="text-left block font-bold">
                                {
                                    participants.map(profile => (
                                        <span key={profile._id}>{`${profile.username}, `}</span>
                                    ))
                                }
                            </span>
                            <span className="block">Online</span>
                        </div>
                    </div>
                    <div className="p-2 h-14 w-14 grid place-items-center">
                        <button className="h-9 w-9 hover:bg-highlighted-grey rounded-full grid place-items-center" onClick={handleShowSettings}>
                            <div
                                className="h-5 w-5 rounded-full grid place-items-center"
                                style={{ backgroundColor: showSettings ? themes[currentTheme] : 'transparent' }}
                            >
                                <MoreHorizontal size={20} style={{ stroke: showSettings ? "#333333" : themes[currentTheme] }} />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="overflow-auto p-3">
                    {Object.entries(groupedMessages).map(([date, messages]) => (
                        <div key={date}>
                            <h2 className="text-center text-light-grey">{date}</h2>
                            <div>
                                {messages.map((message, index) => {
                                    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
                                    const isGrouped = nextMessage && nextMessage.profileId._id === message.profileId._id;
                                    return (
                                        <>
                                            <div key={`${date}-${index}`} className={`w-full ${message.profileId._id === profileId ? "message-group-sent" : "message-group-recieved"}`}>
                                                <div className={`grid ${message.profileId._id === profileId ? 'justify-self-end' : 'justify-self-start'}`}>
                                                    <div className={`text-light-grey ${message.profileId._id === profileId ? 'hidden' : 'justify-self-start'}`}>
                                                        {message.profileId.username}
                                                    </div>
                                                    <div
                                                        style={{
                                                            backgroundColor: message.profileId._id === profileId ? themes[currentTheme] : '#3c3c3c'
                                                        }}
                                                        className={`rounded-lg min-w-[100px] max-w-full my-3 py-2 px-3  text-white`}
                                                    >
                                                        {message.message}
                                                    </div>
                                                </div>
                                                {!isGrouped ? (
                                                    <div className={`rounded-full bg-white h-9 w-9 self-end mb-3 ${message.profileId._id !== profileId ? "recieved-message-profile ml-1" : "hidden"}`}></div>
                                                ) :
                                                    (
                                                        <div className={`w-full h-full recieved-message-profile`}></div>
                                                    )
                                                }
                                            </div>

                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    <div className="bg-white w-full h-2 pb-2" ref={paragraphRef} />
                </div>
                <div className="flex justify-between p-3">
                    <div className="p-[6px] h-10 w-10">
                        <Image style={{ stroke: themes[currentTheme] }} />
                    </div>
                    <div className="grid place-items-center grow">
                        <input className="w-full rounded-full bg-highlighted-grey text-white px-4" type="text"
                            value={messageInput}
                            onChange={handleMessageInputChange}
                        />
                    </div>
                    <button className="p-[6px] h-10 w-10" type="button" onClick={(e) => handleSendMessage(e)}>
                        <Send style={{ stroke: themes[currentTheme], transform: 'rotate(45deg)' }} />
                    </button>
                </div>
            </div>
            {showSettings && (
                <Settings themes={themes} setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} handleShowSettings={handleShowSettings} chatId={chatId} API_URL={API_URL} participants={participants} />
            )}
        </>
    );
}

export default Messages;
