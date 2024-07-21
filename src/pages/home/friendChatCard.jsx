function FriendChatCard({ friend, isChecked, handleOnChange }) {
    return (
        <>
            <div className="group h-15 w-full flex items-center justify-between p-2 rounded-md focus:bg-highlighted-grey hover:bg-highlighted-grey">
                <div className="flex items-center">
                    <div className="h-12 w-12 bg-white rounded-full bg-cover bg-center"
                        style={{ backgroundImage: friend.picture !== "" ? `url(${friend.picture})` : 'none' }}

                    >

                    </div>
                    <div className="flex items-center ml-2 text-light-grey h-12">
                        <h3 className="text-left">{friend.name ? friend.name : ""}</h3>
                    </div>
                </div>
                <div>
                    <input
                        className="w-6 h-6"
                        type="checkbox"
                        id="topping"
                        name="topping"
                        value="Paneer"
                        checked={isChecked}
                        onChange={() => (handleOnChange(friend._id))}
                    >

                    </input>
                </div>
            </div>
        </>
    )
}

export default FriendChatCard;