import { useEffect, useState } from "react";
import { LogOut, MessageCircle, Settings, Users } from "react-feather";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function Navbar() {
    const path = useLocation().pathname;
    const API_URL = import.meta.env.VITE_API_URL;
    const { chatId, profileId } = useParams();
    const navigate = useNavigate();

    const [displayProfileModal, setDisplayProfileModal] = useState(false);
    const [displaySettings, setDisplaySettings] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");



    useEffect(() => {
        async function getProfile() {
            try {
                const profileResponse = await fetch(`http://${API_URL}/profile/${profileId}`, {
                    mode: 'cors',
                    method: 'GET'
                })

                const profile = await profileResponse.json();
                setName(profile.name);
                setUsername(profile.username)
            } catch (error) {
                console.error("Error getting profile: ", error);
            }
        }

        getProfile();
    }, [displaySettings, API_URL, profileId])

    function handleProfileClick() {
        setDisplayProfileModal(!displayProfileModal);
    }

    function handleLogOut() {
        localStorage.removeItem("token");
        alert("You have been logged out!");
        navigate("/");
    }

    function handleDisplaySettings() {
        setDisplaySettings(!displaySettings)
        handleProfileClick();
    }

    async function handleConfirmClick() {
        try {
            const profileChangeResponse = await fetch(`http://${API_URL}/profile/${profileId}`, {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    name: name
                })
            })

            const profileChanged = await profileChangeResponse.json();
            alert("Settings changed!");
            setName(profileChanged.name);
            setUsername(profileChanged.username);
        } catch (error) {
            console.error("Error changing profile: ", error);
        }
        handleDisplaySettings(!displaySettings);
    }

    return (
        <>
            <div className="order-2 md:order-1 w-full h-[50px] md:w-[75px] md:h-full flex md:flex-col items-center justify-between bg-dark-grey shadow-inner">
                <div className="text-white flex md:block">
                    <Link
                        to={`/home/profile/${profileId}/chats`}
                        className={`h-12 w-12 flex items-center justify-center focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md group ${path === "/home/chats" || path === `/home/chats/${chatId}` ? "bg-highlighted-grey" : ""}`}
                    >
                        <MessageCircle className="fill-light-grey stroke-light-grey group-focus:fill-white group-focus:stroke-white" />
                    </Link>
                    <Link
                        to={`/home/profile/${profileId}/friends`}
                        className={`h-12 w-12 flex items-center justify-center focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md group ${path === "/home/friends" ? "bg-highlighted-grey" : ""}`}
                    >
                        <Users className="fill-light-grey stroke-light-grey group-focus:fill-white group-focus:stroke-white" />
                    </Link>
                </div>
                <div className="relative">
                    <button onClick={() => handleProfileClick()}>
                        <div className="rounded-full h-12 w-12 md:h-16 md:w-16 bg-white"></div>
                    </button>
                    {displayProfileModal &&
                        <div className="absolute top-0 -translate-y-48 -translate-x-full md:translate-x-1/4 w-48 h-48 rounded-lg p-2 bg-light-grey">
                            <button className="flex gap-2 items-center h-10"
                                onClick={handleDisplaySettings}
                            ><div className="rounded-full h-8 w-8 bg-white grid place-items-center"><Settings /></div><span className="text-white">Settings</span></button>
                            <button className="flex gap-2 items-center h-10"
                                onClick={() => { handleLogOut() }}><div className="rounded-full h-8 w-8 bg-white grid place-items-center"><LogOut size={18} /></div><span className="text-white">Log Out</span></button>
                        </div>
                    }
                </div>
            </div>
            {
                displaySettings &&
                <div className="h-screen w-screen grid place-items-center shadow-sm bg-black/70 absolute top-0 left-0 z-50" onClick={handleDisplaySettings}>
                    <div className="settings-grid relative w-1/4 h-1/2 max-h-[700px] max-w-[637px] rounded-lg bg-grey opacity-100" onClick={(e) => e.stopPropagation()}>
                        <div className="p-3">
                            <h2 className="text-white text-center">Settings</h2>
                            <button className="absolute top-0 right-0 bg-highlighted-grey rounded-full h-6 w-6 text-white m-3"
                                onClick={handleDisplaySettings}>X</button>
                        </div>
                        <div className="p-4">
                            <div>
                                <label className="font-bold text-white" htmlFor="name">Username (login)</label>
                                <input className="w-full rounded-md px-2 text-black" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mt-2">
                                <label className="font-bold text-white" htmlFor="name">Name (displayed in chat)</label>
                                <input className="w-full rounded-md px-2 text-black" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-white p-3">
                            <button className="bg-highlighted-grey rounded-lg" onClick={handleDisplaySettings}>
                                Cancel
                            </button>
                            <button className="bg-highlighted-grey rounded-lg" onClick={handleConfirmClick}>
                                Confirm
                            </button>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Navbar;
