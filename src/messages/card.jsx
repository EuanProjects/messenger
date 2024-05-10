function Card() {
    return (
        <>
            <button className="h-15 w-full flex p-2 focus:bg-highlighted-grey hover:bg-highlighted-grey rounded-md">
                <div className="flex-shrink-0 h-12 w-12 bg-white rounded-full"></div>
                <div className="flex-grow flex flex-col justify-center ml-2 text-light-grey">
                    <h3 className="text-left">Name</h3>
                    <div className="max-w-48 flex text-sm">
                        <span className="block truncate overflow-hidden">a bunch of random text until it overflows the container</span>
                        <span>.</span>
                        <span>2d.</span>
                    </div>


                </div>
            </button>

        </>
    )
}

export default Card;