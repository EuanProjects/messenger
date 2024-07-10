import { Link } from "react-router-dom";

function ChatCard({ chat }) {
    return (
        <>
            <Link to={chat._id} className="h-15 w-full flex p-2 focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md">
                <div className="h-12 w-12 bg-white rounded-full"></div>
                <div className="flex flex-col justify-center ml-2 text-light-grey">
                    <h3 className="text-left">
                        {
                            chat.profileIds.map(profile => (
                                <span key={profile._id}>{`${profile.username}, `}</span>
                            ))
                        }
                    </h3>
                    <div className="max-w-48 flex text-sm">
                        <span className="block truncate overflow-hidden">a bunch of random text until it overflows the container</span>
                        <span>.</span>
                        <span>2d.</span>
                    </div>


                </div>
            </Link>

        </>
    )
}

export default ChatCard;