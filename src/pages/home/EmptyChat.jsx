function EmptyChat() {
    return (
        <>
            <div className="hidden order-3 md:grid bg-grey w-full h-full rounded-lg place-items-center shadow-lg">
                <div>
                    <h3 className="text-white text-center md:text-2xl lg:text-4xl font-bold text-wrap px-4">Click on a friend to start a message!</h3>
                </div>
            </div>
        </>
    )
}

export default EmptyChat