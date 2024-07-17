function FriendCard({ person, handleFriendCardClick }) {
    return (
        <button
            className="group h-15 w-full flex items-center justify-between p-2 rounded-md focus:bg-highlighted-grey hover:bg-highlighted-grey"
            onClick={() => {handleFriendCardClick(person._id)}}
            type="button"
        >
            <div className="flex items-center">
                <div className="h-12 w-12 bg-white rounded-full"></div>
                <div className="flex items-center ml-2 text-light-grey h-12">
                    <h3 className="text-left">{person ? person.username : ""}</h3>
                </div>
            </div>
        </button>
    );
}

export default FriendCard;