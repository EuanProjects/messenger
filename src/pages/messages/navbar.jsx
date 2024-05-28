import React, { useRef } from "react";
import { MessageCircle, Users } from "react-feather";

function Navbar() {
    const buttonRefs = useRef([React.createRef(), React.createRef()]);

    function NavClick(index) {
        console.log(index);
    }

    return (
        <>
            <div className="w-[75px] h-full flex flex-col items-center justify-between bg-dark-grey shadow-inner">
                <div className="text-white">
                    <button
                        ref={buttonRefs.current[0]}
                        onClick={() => NavClick(0)}
                        className="h-12 w-12 flex items-center justify-center focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md group"
                    >
                        <MessageCircle className="fill-light-grey stroke-light-grey group-focus:fill-white group-focus:stroke-white" />
                    </button>
                    <button
                        ref={buttonRefs.current[1]}
                        onClick={() => NavClick(1)}
                        className="h-12 w-12 flex items-center justify-center focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md group"
                    >
                        <Users className="fill-light-grey stroke-light-grey group-focus:fill-white group-focus:stroke-white" />
                    </button>
                </div>
                <div>
                    <div className="rounded-full h-16 w-16 bg-white"></div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
