import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, X, Users, Trash2 } from "react-feather";
import "./styles/settings.css";
import { useLocation, useNavigate } from "react-router-dom";

function Settings({ themes, setCurrentTheme, currentTheme, handleShowSettings, chatId, API_URL, participants, otherProfilePicture }) {
    const [showChatSettings, setShowChatSettings] = useState(false);
    const [displayDeleteConfirm, setDisplayDeleteConfirm] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    const [showChangeThemes, setShowChangeThemes] = useState(false);
    const [newThemeSelected, setNewThemeSelected] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);
    const profileId = useLocation().pathname.split("/")[3];
    const navigate = useNavigate();

    function handleShowChatSettingsClick() {
        setShowChatSettings(!showChatSettings);
    }

    function handleShowThemesClick() {
        setNewThemeSelected(false);
        setSelectedTheme(currentTheme);
        setShowChangeThemes(!showChangeThemes);
    }

    function handleSelectedTheme(newSelectedTheme) {
        setSelectedTheme(newSelectedTheme);
        setNewThemeSelected(true);
    }

    function handleParticipants() {
        setShowParticipants(!showParticipants);
    }

    async function handleConfirmTheme() {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://${API_URL}/conversation/${chatId}/theme`, {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "theme": selectedTheme
                })

            });

            if (!response.ok) {
                navigate("/");
            }

            const data = await response.json();

        } catch (error) {
            console.error("Error fetching data: ", error)
        }
        setCurrentTheme(selectedTheme);
        setShowChangeThemes(false);
    }

    function handleDisplayDeleteConfirm() {
        setDisplayDeleteConfirm(!displayDeleteConfirm);
    }

    function handleDeleteClick() {
        handleDisplayDeleteConfirm()
    }

    async function handleConfirmClick() {
        const token = localStorage.getItem("token");
        try {
            const deleteResponse = await fetch(`http://${API_URL}/conversation/${chatId}`, {
                mode: 'cors',
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (deleteResponse.ok) {
                navigate(`/home/profile/${profileId}/chats`);
            }
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    return (
        <>
            <div className="order-1 md:order-4 min-w-[250px] w-full md:grow xl:w-1/6 h-full bg-grey rounded-xl shadow-inner flex flex-col">
                <div className="flex justify-start p-2">
                    <button className="bg-highlighted-grey rounded-full h-6 w-6 text-white m-3"
                        onClick={handleShowSettings}>
                        <ChevronLeft style={{
                            stroke: `${themes[selectedTheme]}`,
                        }} />
                    </button>
                </div>
                <div className="w-full">
                    <div className="h-24 w-24 rounded-full bg-light-grey mx-auto mt-3 bg-center bg-cover grid place-items-center"
                        style={{ backgroundImage: otherProfilePicture !== "" ? `url(${otherProfilePicture})` : 'none' }}
                    >
                        {
                            otherProfilePicture === "" &&
                            <Users size={36} className="fill-dark-grey stroke-dark-grey" />
                        }
                    </div>
                    <h2 className="text-xl text-center mt-1 text-white">{participants.map((participant) => participant.name).join(", ")}</h2>
                    <p className="text-white text-center w-full">{participants.length === 2 ? "" : `Participants ${participants.length}`}</p>
                </div>
                <div className="px-1 my-1 text-white">
                    <button className="w-full flex justify-between h-12 place-items-center rounded-lg px-2 hover:bg-highlighted-grey"
                        onClick={handleShowChatSettingsClick}>
                        <p>Chat Settings</p>
                        <ChevronRight className={`${showChatSettings ? "rotate-90" : ""}`} />
                    </button>
                    {
                        showChatSettings &&
                        <>
                            <button className="h-12 w-full px-3 flex gap-2 hover:bg-highlighted-grey place-items-center rounded-lg"
                                onClick={handleShowThemesClick}>
                                <div>
                                    <div className="h-8 w-8 rounded-full bg-highlighted-grey flex justify-center place-items-center">
                                        <div
                                            style={{
                                                border: `4px solid ${themes[currentTheme]}`,
                                            }}
                                            className="w-4 h-4 rounded-full relative"
                                        ></div>
                                    </div>
                                </div>
                                <p>Change Theme</p>
                            </button>
                        </>
                    }
                    <button className="w-full flex justify-between h-12 place-items-center rounded-lg px-2 hover:bg-highlighted-grey" onClick={handleParticipants}>
                        <p>Participants</p>
                        <ChevronRight className={`${showParticipants ? "rotate-90" : ""}`} />
                    </button>
                    {
                        showParticipants &&
                        <>
                            {
                                participants.map(particpant => (
                                    <>
                                        <div className="h-12 w-full px-3 flex gap-2 hover:bg-highlighted-grey place-items-center rounded-lg"
                                            onClick={handleShowThemesClick}>
                                            <div>
                                                {particpant.name}
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </>
                    }
                    <div className="grid place-items-center mt-4">
                        <button className="min-w-[150px] w-1/2 max-w-[175px] flex gap-2 h-12 place-items-center justify-center rounded-lg px-2 border-2 border-red-500 hover:bg-highlighted-grey text-red-500"
                            onClick={handleDisplayDeleteConfirm}>
                            <Trash2 className="stroke-red-500" />
                            Delete Chat
                        </button>
                    </div>
                </div>
            </div>
            {
                displayDeleteConfirm &&
                <>
                    <div className="h-screen w-screen grid place-items-center shadow-sm bg-black/70 absolute top-0 left-0" onClick={handleDisplayDeleteConfirm}>
                        <div className="settings-grid relative h-[390px] w-[318px] rounded-lg bg-grey opacity-100" onClick={handleDisplayDeleteConfirm}>
                            <div className="grid place-items-center text-white font-bold">
                                Confirm Delete?
                            </div>
                            <p className="text-white px-2 text-center">
                                The following chat containing&nbsp;
                                {participants.map((participant) => participant.name).join(", ")} 
                                &nbsp;and all its messages will be deleted!
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-white p-3">
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleDisplayDeleteConfirm}>
                                    Cancel
                                </button>
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleConfirmClick}>
                                    Confirm
                                </button>

                            </div>
                        </div>
                    </div>
                </>
            }
            {
                showChangeThemes &&
                <>
                    <div className="h-screen w-screen grid place-items-center shadow-sm bg-black/70 absolute top-0 left-0" onClick={handleShowThemesClick}>
                        <div className="settings-grid min-h-[390px] min-w-[318px] relative w-1/2 h-3/4 max-h-[700px] max-w-[637px] rounded-lg bg-grey opacity-100" onClick={(e) => e.stopPropagation()}>
                            <div className="p-3">
                                <h2 className="text-white text-center">Preview and select theme</h2>
                                <button className="absolute top-0 right-0 bg-highlighted-grey rounded-full h-6 w-6 text-white m-3"
                                    onClick={handleShowThemesClick}>X</button>
                            </div>
                            <div className="overflow-y-auto grid grid-cols-2 gap-4 p-4">
                                <div className="overflow-y-auto">
                                    {
                                        Object.keys(themes).map((theme) => (
                                            <>
                                                <button onClick={() => { handleSelectedTheme(theme) }} className={`flex w-full rounded-lg ${selectedTheme === theme ? 'bg-highlighted-grey' : ''} justify-between px-2 py-4`}>
                                                    <div className="flex justify-start place-items-center">
                                                        <div
                                                            style={{
                                                                border: `8px solid ${themes[theme]}`,
                                                            }}
                                                            className="w-6 h-6 border-solid rounded-full relative mr-2"
                                                        ></div>
                                                        <span className="text-white">{theme}</span>
                                                    </div>
                                                    {(theme === currentTheme) &&
                                                        <div className="grid h-full place-items-center">
                                                            <Check className="stroke-white" />
                                                        </div>
                                                    }
                                                </button>
                                            </>
                                        ))
                                    }
                                </div>
                                <div className="flex flex-col p-2 bg-dark-grey rounded-lg">
                                    <div
                                        style={{
                                            backgroundColor: themes[selectedTheme],
                                            color: 'white',
                                        }}
                                        className="place-self-end rounded-lg min-h-16 min-w-[100px] max-w-[75%] my-3 py-2 px-3"
                                    >
                                        Messages sent will look like this
                                    </div>
                                    <div className="bg-highlighted-grey recieved-message justify-self-start rounded-lg h-18 min-w-[100px] max-w-[75%] my-3 py-2 px-3 text-white">
                                        Messages received will look like this
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-white p-3">
                                <button className="bg-highlighted-grey rounded-lg" onClick={handleShowThemesClick}>
                                    Cancel
                                </button>
                                {newThemeSelected &&
                                    <button className="bg-highlighted-grey rounded-lg" onClick={handleConfirmTheme}>
                                        Select
                                    </button>
                                }
                                {
                                    !newThemeSelected &&
                                    <div className="bg-dark-grey rounded-lg place-content-center text-center">
                                        Select
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}
export default Settings;
