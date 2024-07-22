import { Link } from "react-router-dom";
import "./styles/chatCard.css"
import { useState, useEffect } from "react";
import { Users } from "react-feather";

function ChatCard({ chat, profileId, chatId }) {
    const [profilePicture, setProfilePicture] = useState("");
    let displayDate = "";
    let lastName = "";
    const givenDate = new Date(chat.lastUpdated);

    const today = new Date();
    const differenceInMs = givenDate.getTime() - today.getTime();
    const daysAway = Math.abs(Math.round(differenceInMs / (1000 * 60 * 60 * 24)));
    if (daysAway === 0) {
        displayDate = "Today"
    } else {
        displayDate = `${daysAway}d.`
    }
    if (chat.lastMessage) {
        lastName = chat.profileIds?.find((profile) => profile._id === chat.lastMessage.profileId)?.name;
    }

    const formattedNames = chat.profileIds.filter(profile => profile._id !== profileId)
        .map(profile => profile.name)
        .join(', ');

    useEffect(() => {
        if (chat.profileIds.length === 2) {
            const filteredProfileIds = chat.profileIds.filter((profile) => profile._id !== profileId);
            if (filteredProfileIds.length > 0) {
                setProfilePicture(filteredProfileIds[0].picture);
            }
        }
    }, [chat.profileIds, profileId]);


    return (
        <>
            <Link to={chat._id} className={`h-15 w-full chat-card-container p-2 focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md ${chatId === chat._id ? "bg-highlighted-grey" : ""}`}>
                <div className="h-12 w-12 bg-white rounded-full bg-cover bg-center grid place-items-center"
                    style={{ backgroundImage: profilePicture !== "" ? `url(${profilePicture})` : 'none' }}
                >
                    {
                        profilePicture === "" &&
                        <Users className="fill-dark-grey stroke-dark-grey"/>
                    }
                </div>
                <div className="flex flex-col justify-center ml-2 text-light-grey">
                    <h3 className="text-left">
                        {formattedNames}
                    </h3>
                    <div className="flex text-sm">
                        <span className="block truncate overflow-hidden text-gray-200">{chat.lastMessage ? `${lastName}: ${chat.lastMessage.message}` : ""}</span>
                        {
                            lastName !== "" &&
                            <span>.</span>
                        }
                        <span>{displayDate}</span>
                    </div>


                </div>
            </Link>

        </>
    )
}

export default ChatCard;