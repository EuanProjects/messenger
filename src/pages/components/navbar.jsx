import { LogOut, MessageCircle, Settings, Users } from "react-feather";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function Navbar() {
    const path = useLocation().pathname;
    const { chatId, profileId } = useParams();
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem("token");
        alert("You have been logged out!");
        navigate("/");
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
                    <button>
                        <div className="rounded-full h-12 w-12 md:h-16 md:w-16 bg-white"></div>
                    </button>
                    <div className="absolute top-0 -translate-y-48 -translate-x-full md:translate-x-1/4 w-48 h-48 rounded-lg p-2 bg-light-grey">
                        <button className="flex gap-2 items-center h-10"
                            ><div className="rounded-full h-8 w-8 bg-white grid place-items-center"><Settings /></div><span className="text-white">Settings</span></button>
                        <button className="flex gap-2 items-center h-10"
                            onClick={() => { handleLogOut() }}><div className="rounded-full h-8 w-8 bg-white grid place-items-center"><LogOut size={18} /></div><span className="text-white">Log Out</span></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
