import { MessageCircle, Users } from "react-feather";
import { Link, useLocation, useParams } from "react-router-dom";

function Navbar() {
    const path = useLocation().pathname;
    const { chatId, profileId } = useParams();

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
                <div>
                    <div className="rounded-full h-12 w-12 md:h-16 md:w-16 bg-white"></div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
