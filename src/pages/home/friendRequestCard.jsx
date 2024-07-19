import { useNavigate } from "react-router-dom";

function FriendRequestCard({ person, profileId, hasRequestSent, hasRequestRecieved, setDisplayFindNewFriend, setAction }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function handleSendAddRequest(friendId) {
        try {
            const response = await fetch(`http://${API_URL}/request`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    {
                        requesterId: profileId,
                        accepterId: friendId
                    }
                )
            });

            if (!response.ok) {
                navigate("/");
            }
            const data = await response.json();
            setDisplayFindNewFriend(false);
            setAction(true);
        } catch (error) {
            console.error("Error sending request: ", error)
        }
    }

    async function handleAcceptRequest() {
        const url = hasRequestRecieved ? `http://${API_URL}/request/${hasRequestRecieved._id}` : "";
        try {
            const response = await fetch(url, {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    {
                        requesterId: person._id,
                        accepterId: profileId
                    }
                )
            });

            if (!response.ok) {
                navigate("/");
            }
            const data = await response.json();
            setDisplayFindNewFriend(false);
            setAction(true);
        } catch (error) {
            console.error("Error sending request: ", error)
        }
    }

    async function handleRejectRequest() {
        const url = hasRequestRecieved ? `http://${API_URL}/request/${hasRequestRecieved._id}` : `http://${API_URL}/request/${hasRequestSent._id}`;
        try {
            const response = await fetch(url, {
                mode: 'cors',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                navigate("/");
            }
            
            const data = await response.json();
            setDisplayFindNewFriend(false);
            setAction(true);
        } catch (error) {
            console.error("Error sending request: ", error)
        }
    }

    return (
        <>
            <div className={`group h-15 w-full flex items-center justify-between p-2 rounded-md ${hasRequestSent ? "bg-highlighted-grey" : "focus:bg-highlighted-grey hover:bg-highlighted-grey"}`} disabled={hasRequestSent || hasRequestRecieved}>
                <div className="flex items-center">
                    <div className="h-12 w-12 bg-white rounded-full"></div>
                    <div className="flex items-center ml-2 text-light-grey h-12">
                        <h3 className="text-left">{person ? person.name : ""}</h3>
                    </div>
                </div>
                {
                    hasRequestSent &&
                    <div className="group">
                        <div className="text-red-500 group-hover:hidden">Pending</div>
                        <button className="hidden group-hover:block group-hover:bg-dark-grey hover:text-red-500 text-white px-2 rounded-lg"
                            onClick={() => { handleRejectRequest() }}>Reject</button>
                    </div>
                }
                {
                    hasRequestRecieved &&
                    <div>
                        <button className="rounded-l-lg bg-highlighted-grey px-2 group-hover:bg-dark-grey hover:text-green-500 text-white"
                            onClick={() => { handleAcceptRequest() }}>Accept</button>
                        <button className="rounded-r-lg bg-highlighted-grey px-2 group-hover:bg-dark-grey hover:text-red-500 text-white"
                            onClick={() => { handleRejectRequest() }}>Reject</button>
                    </div>
                }
                {
                    !hasRequestRecieved && !hasRequestSent &&
                    <button className="rounded-lg bg-highlighted-grey px-2 group-hover:bg-dark-grey hover:text-green-500 text-white"
                        onClick={() => { handleSendAddRequest(person._id) }}
                    >Add</button>
                }

            </div>
        </>
    );
}

export default FriendRequestCard;
