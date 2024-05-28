import React, { useState } from "react";
import { MoreHorizontal, Image, Send } from "react-feather";
import "./styles/messages.css";
import Settings from "./settings";

function Messages() {
    const themes = {
        "Default": "#6A36EB",
        "Blue": "#0E92EB",
        "Amber": "#ffbf00",
        "Lime": "#84cc16",
        "Yellow": "#facc15",
        "Orange": "#fb923c",
    };

    const [currentTheme, setCurrentTheme] = useState("Default");
    const [showSettings, setShowSettings] = useState(false);

    function handleShowSettings() {
        setShowSettings(!showSettings);
    }

    const messages = [
        { text: 'Message 1 what if it is really long and wnats to ggrow super far? will it just keep going?', date: '2024-05-10T12:30:00', pid: "1" },
        { text: 'Me', date: '2024-05-10T15:45:00', pid: "2" },
        { text: 'Message 3', date: '2024-05-11T09:20:00', pid: "1" },
        { text: 'This is a a really reandom thype of testing becauser i just want to see what wil happen 4 alskjdf;laskjd as;ldkfja sl;kjasd ;alksjdfal;ksjf ', date: '2024-05-11T13:10:00', pid: "2" },
        { text: 'Message 5', date: '2024-05-12T08:55:00', pid: "2" }
    ];
    for (let i = 0; i < 100; i++) {
        messages.push({ text: 'Message 5', date: '2024-05-12T08:55:00', pid: "2" });
    }

    const groupedMessages = messages.reduce((acc, message) => {
        const date = new Date(message.date).toISOString().split('T')[0];
        acc[date] = acc[date] || [];
        acc[date].push(message);
        return acc;
    }, {});

    return (
        <>
            <div className={`messages-grid ${showSettings ? 'w-4/6' : 'w-5/6'} h-full bg-grey rounded-xl shadow-inner`}>
                <div className="flex justify-between p-3 drop-shadow-sm">
                    <div className="h-14 flex">
                        <div className="h-12 w-12 p-[6px]">
                            <div className="h-9 w-9 bg-white rounded-full"></div>
                        </div>
                        <div className="ml-1 text-light-grey">
                            <span className="text-left block font-bold">Name</span>
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
                                    const isGrouped = nextMessage && nextMessage.pid === message.pid;
                                    return (
                                        <div key={`${date}-${index}`} className={`w-full ${message.pid === "2" ? "message-group-sent" : "message-group-recieved"}`}>
                                            <div
                                                style={{
                                                    backgroundColor: message.pid === '2' ? themes[currentTheme] : '#3c3c3c'
                                                }}
                                                className={`rounded-lg min-w-[100px] max-w-[75%] my-3 py-2 px-3  text-white ${message.pid === '2' ? 'justify-self-end' : 'justify-self-start'}`}
                                            >
                                                {message.text}
                                            </div>
                                            {!isGrouped && (
                                                <div className={`rounded-full bg-white h-9 w-9 self-end mb-3 ${message.pid === "1" ? "recieved-message-profile ml-1" : "mr-3"}`}></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between p-3">
                    <div className="p-[6px] h-10 w-10">
                        <Image style={{ stroke: themes[currentTheme] }} />
                    </div>
                    <div className="grid place-items-center grow">
                        <input className="w-full rounded-full bg-highlighted-grey" type="text" />
                    </div>
                    <div className="p-[6px] h-10 w-10">
                        <Send style={{ stroke: themes[currentTheme], transform: 'rotate(45deg)' }} />
                    </div>
                </div>
            </div>
            {showSettings && (
                <Settings themes={themes} setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} />
            )}
        </>
    );
}

export default Messages;
