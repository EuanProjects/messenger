function FriendCard({ person, onClick }) {
    return (
        <>
            <button className="h-15 w-full flex items-center p-2 focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md" onClick={onClick}>
                <div className="h-12 w-12 bg-white rounded-full"></div>
                <div className="flex items-center ml-2 text-light-grey h-12">
                    <h3 className="text-left">{person ? person.username : ""}</h3>
                </div>
            </button>
        </>
    );
}

export default FriendCard;
