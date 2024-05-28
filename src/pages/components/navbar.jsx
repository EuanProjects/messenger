import React, { useRef } from "react";
import { MessageCircle, Users } from "react-feather";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const path = useLocation().pathname;
    console.log(path)


    return (
        <>
            <div className="w-[75px] h-full flex flex-col items-center justify-between bg-dark-grey shadow-inner">
                <div className="text-white">
                    <Link
                        to="/home/chats"
                        className={`h-12 w-12 flex items-center justify-center focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md group ${path === "/home/chats" ? "bg-highlighted-grey" : ""}`}
                    >
                        <MessageCircle className="fill-light-grey stroke-light-grey group-focus:fill-white group-focus:stroke-white" />
                    </Link>
                    <Link
                        to="/home/friends"
                        className={`h-12 w-12 flex items-center justify-center focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md group ${path === "/home/friends" ? "bg-highlighted-grey" : ""}`}
                    >
                        <Users className="fill-light-grey stroke-light-grey group-focus:fill-white group-focus:stroke-white" />
                    </Link>
                </div>
                <div>
                    <div className="rounded-full h-16 w-16 bg-white"></div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
