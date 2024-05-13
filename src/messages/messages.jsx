import { useState } from "react";
import { MoreHorizontal, Settings } from "react-feather";

function Messages() {
    const [showSettings, setShowSettings] = useState(false);

    function handleShowSettings() {
        setShowSettings(!showSettings);
    }

    return (
        <>
            <div className={`${showSettings ? 'w-4/6' : 'w-5/6'} h-full bg-grey rounded-xl shadow-inner`}>
                <div className="flex justify-between p-3">
                    <div className="h-14 flex">
                        <div className="h-12 w-12 p-[6px]">
                            <div className="h-9 w-9 bg-white rounded-full">

                            </div>
                        </div>
                        <div className="ml-1 text-light-grey">
                            <span className="text-left block font-bold">Name</span>
                            <span className="block">Online</span>
                        </div>
                    </div>
                    <div className="p-2 h-14 w-14 grid place-items-center">
                        <button className="h-9 w-9 hover:bg-highlighted-grey rounded-full grid place-items-center" onClick={handleShowSettings}>
                            <div className={`h-5 w-5 rounded-full grid place-items-center ${showSettings ? 'bg-deep-purple' : ''}`}>
                                <MoreHorizontal size={20} className={showSettings ? "stroke-dark-grey" : "stroke-deep-purple"} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {
                showSettings &&
                <>
                    <div className="w-1/6 min-w-[250px] h-full bg-grey rounded-xl shadow-inner">

                    </div>
                </>
            }
        </>
    )
}

export default Messages;