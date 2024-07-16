function FriendCard({ person, profileId, hasRequestSent, hasRequestRecieved, setDisplayFindNewFriend, isFriend }) {
    const API_URL = import.meta.env.VITE_API_URL;
    console.log(person);
    console.log(isFriend);
    async function handleSendAddRequest(friendId) {
        try {
            const response = await fetch(`http://${API_URL}/request`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        requesterId: profileId,
                        accepterId: friendId
                    }
                )
            });
            const data = await response.json();
            setDisplayFindNewFriend(false);
        } catch (error) {
            console.error("Error sending request: ", error)
        }
    }

    async function handleAcceptRequest() {
        const url = hasRequestRecieved ? `http://${API_URL}/request/${hasRequestRecieved._id}` : "";
        console.log(url);
        try {
            const response = await fetch(url, {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        requesterId: person._id,
                        accepterId: profileId
                    }
                )
            });
            const data = await response.json();
            setDisplayFindNewFriend(false);
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
                        <h3 className="text-left">{person ? person.username : ""}</h3>
                    </div>
                </div>
                {
                    hasRequestSent &&
                    <div className="text-red-500">Pending</div>
                }
                {
                    hasRequestRecieved &&
                    <button className="rounded-lg bg-highlighted-grey px-2 group-hover:bg-dark-grey text-white"
                        onClick={() => { handleAcceptRequest() }}>Accept</button>
                }
                {
                    !hasRequestRecieved && !hasRequestSent && !isFriend &&
                    <button className="rounded-lg bg-highlighted-grey px-2 group-hover:bg-dark-grey text-white"
                        onClick={() => { handleSendAddRequest(person._id) }}
                    >Add</button>
                }

            </div>
        </>
    );
}

export default FriendCard;
